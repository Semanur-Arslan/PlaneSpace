import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchReservations } from "../../redux/slices/reservationSlice";
import formatDate from "../../utils/dateFormatter";
import formatTime from "../../utils/timeFormatter";
import Toast from '../ToastMessage/index';
import FlightExtraBox from '../../components/FlightExtraBox/index'
import { deleteReservationAPI } from "../../api/backendApi";
import { IoIosArrowDown } from "react-icons/io";
import AirlineLogo from '../../images/airline-logo.jpg';

//Props olarak rezervasyon verisini aldım.
export default function Index({ reservation }) {

    const dispatch = useDispatch();
    const ref = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [toast, setToast] = useState({ message: '', type: '' });

    //Rezervasyon içerisindeki kullanacağım değerleri tanımladım.
    const {
        actualOffBlockTime,
        estimatedLandingTime,
        airline,
        flightName,
        flightNumber,
        terminal,
        route
    } = reservation;


    //Silme İşlemleri
    const handleDelete = async () => {
        try {
            const response = await deleteReservationAPI(reservation._id);
            showToast(response.message || 'Reservation deleted', 'success');
            setTimeout(() => {
                dispatch(fetchReservations());
            }, 2000);

        } catch (error) {
            showToast(error.message || 'Reservation could not be deleted', 'error');
        }
    };

    //Toast Mesajı işlemleri
    const showToast = (msg, type) => { setToast({ message: msg, type }) };
    const closeToast = () => { setToast({ message: '', type: '' }) };

    // Show-Hide kart yapısı için işlemler
    const toggleDetails = () => {
        setIsExpanded(!isExpanded);
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsExpanded(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    // Tarih nesnesine saat ekleyen veya çıkaran fonksiyon
    const adjustTime = (timeString, hours) => {
        if (!timeString) return null;
        const date = new Date(timeString);
        date.setHours(date.getHours() + hours);
        return formatTime(date);
    };

    return (
        <>
            <div ref={ref} className='relative bg-white p-2 md:p-4 rounded-lg rounded-lg my-4'>
                <div className='grid grid-cols-3 justify-items-start content-center gap-8 md:gap-4'>
                    <div className="col-span-3 md:col-span-2 flex justify-center items-center space-x-4 md:space-x-8 w-full">
                        <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-mediumGray overflow-hidden flex justify-center items-center">
                            <img src={AirlineLogo} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="w-full">
                            <div className="flex justify-between items-center">
                                <h5 className="text-base md:text-xl py-2">
                                    {estimatedLandingTime ? adjustTime(estimatedLandingTime, -2) : formatTime(actualOffBlockTime)} -  {actualOffBlockTime ? adjustTime(actualOffBlockTime, 2) : formatTime(estimatedLandingTime)}
                                </h5>
                                <div>
                                    <button onClick={handleDelete} className="py-1 px-4 border border-error rounded-xl text-sm text-error font-semibold hover:text-white hover:bg-error transition">Delete</button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 md:pt-4 gap-2 md:gap-16">
                                <div className="text-sm font-semibold flex flex-row md:flex-col justify-between">
                                    <h5 className="text-darkGray">{airline} Airlines</h5>
                                    <div onClick={toggleDetails} className=" md:py-2 cursor-pointer">
                                        <p className="text-primary text-sm flex items-center">
                                            {isExpanded ? 'Hide details' : 'Flight Details'}
                                            <span className={`ps-1 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                                                <IoIosArrowDown />
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div className="text-sm font-semibold flex flex-row md:flex-col justify-between">
                                    <h5 className="text-darkGray">Flighy Name</h5>
                                    <p className="text-lightGray  md:py-2">{flightName}</p>
                                </div>
                                <div className="text-sm font-semibold flex flex-row md:flex-col justify-between">
                                    <h5 className="text-darkGray">Flighy Number</h5>
                                    <p className="text-lightGray  md:py-2">{flightNumber}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-3 md:col-span-1 grid grid-cols-4 gap-2 lg:gap-4 w-full">
                        <FlightExtraBox price="$156" label="Main" />
                        <FlightExtraBox price="$204" label="Comfort+" />
                        <FlightExtraBox />
                        <FlightExtraBox price="$386" label="First" />
                    </div>
                </div>
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? "max-h-40" : "max-h-0 "}`}>
                    {isExpanded && (
                        <div className="flex flex-col justify-start py-4 text-lightGray text-sm md:text-sm pt-8">
                            <h6 className="text-primary text-base mb-2">
                                Details:
                            </h6>
                            <div className="md:w-2/3 w-full">
                                <div className="flex space-x-8 py-1">
                                    <p className="font-bold ">
                                        Route :
                                    </p>
                                    <p>
                                        {actualOffBlockTime ? `Amsterdam, Schiphol - ${route}` : `${route} - Amsterdam, Schiphol`}
                                    </p>
                                </div>
                                <div className="flex space-x-12 py-1">
                                    <p className="font-bold ">
                                        Date :
                                    </p>
                                    <p>
                                        {estimatedLandingTime ? formatDate(estimatedLandingTime, 'dd-mm-yyyy') : actualOffBlockTime ? formatDate(actualOffBlockTime, 'dd-mm-yyyy') : ''}
                                    </p>
                                </div>
                                <div className="flex space-x-8 py-1">
                                    <p className="font-bold ">
                                        Terminal :
                                    </p>
                                    <p>
                                        {terminal}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {toast.message && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
        </>
    )
}
