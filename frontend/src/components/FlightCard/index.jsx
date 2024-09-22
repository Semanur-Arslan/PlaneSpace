// Uçuş Kartı için oluşturduğum component
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import formatTime from "../../utils/timeFormatter";
import formatDate from "../../utils/dateFormatter";
import { createReservationAPI } from "../../api/backendApi";
import Toast from '../ToastMessage/index'
import { LuPlaneTakeoff, LuPlaneLanding } from "react-icons/lu";
import { IoIosAirplane } from "react-icons/io";

// Burada props olarak uçuş verisini aldım.
export default function Index({ flight }) {

  const ref = useRef(null);
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  // Uçuş verisi içerisindeki kullanacağım değerleri tanımladım.
  const {
    estimatedLandingTime,
    actualOffBlockTime,
    scheduleDateTime,
    expectedTimeOnBelt,
    prefixICAO,
    route,
    flightName,
    flightNumber,
    terminal
  } = flight;

  // Kalkış / Varış noktası adı
  const destinationIATA = route.destinations[route.destinations.length - 1]

  // Geçmiş tarihler için rezervasyon yapılmaması için kontrol ekledim
  // Rezervasyon için keydedeceğim verileri tanımladım ve api isteği fonksiyonunu çalıştırdım.
  // API den gelen yanıta göre toast mesajı ekledim ve sayfa yönlendirmesini ekledim.
  const handleBookFlight = async () => {

    const currentDate = new Date();
    const flightDate = new Date(estimatedLandingTime || actualOffBlockTime);

    if (flightDate < currentDate) {
      showToast('You cannot make a reservation for a past date.', 'error');
      return;
    }

    const newReservation = {
      actualOffBlockTime: actualOffBlockTime,
      estimatedLandingTime: estimatedLandingTime,
      airline: prefixICAO || '',
      flightName: flightName || '',
      flightNumber: flightNumber || '',
      terminal: terminal || '',
      timeOnBelt: expectedTimeOnBelt || '',
      route: destinationIATA || ''
    };

    try {
      const response = await createReservationAPI(newReservation);
      showToast(response.message, 'success');
      setTimeout(() => {
        navigate('/my-flights');
      }, 2000);
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  // Toast Mesajı işlemleri
  const showToast = (msg, type) => { setToast({ message: msg, type })};
  const closeToast = () => { setToast({ message: '', type: '' })};

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
      <div ref={ref} className='relative bg-white p-4 rounded-r-lg rounded-tl-lg'>
        <div className="flex justify-between text-sm md:text-base">
          <h3>
            {actualOffBlockTime ? `Amsterdam, Schiphol - ${destinationIATA}` : `${destinationIATA} - Amsterdam, Schiphol`}
          </h3>
          <p>
            {estimatedLandingTime ? formatDate(estimatedLandingTime, 'dd-mm-yyyy') :
              actualOffBlockTime ? formatDate(actualOffBlockTime, 'dd-mm-yyyy') :
                ''}
          </p>
        </div>

        <div className='grid grid-cols-8 justify-items-center content-center mt-4 mb-6 md:mb-12'>
          <div className="col-span-2 ">
            <div className="flex items-center space-x-2 text-lightGray text-xs md:text-sm">
              <LuPlaneTakeoff />
              <span>
                Departure
              </span>
            </div>
            <h5 className="text-sm md:text-lg font-semibold py-2">
              {estimatedLandingTime ? adjustTime(estimatedLandingTime, -2) : formatTime(actualOffBlockTime)}
            </h5>
            <p className="text-lightGray text-xs md:text-sm">
              {actualOffBlockTime ? 'Amsterdam, Schiphol' : destinationIATA}
            </p>
          </div>
          <hr className="mt-6 w-4 md:w-24 lg:w-32" />
          <div className="col-span-2 flex flex-col items-center h-full ">
            <p className="text-sm font-semibold">
              {prefixICAO} Airline
            </p>
            <IoIosAirplane size={24} color="#5b21b6" className="my-2" />
            <p className="text-lightGray text-xs">
              02h 05m
            </p>
          </div>
          <hr className="mt-6 w-4 md:w-24 lg:w-32" />
          <div className="col-span-2">
            <div className="flex items-center space-x-2 text-lightGray text-xs md:text-sm">
              <LuPlaneLanding />
              <span>
                Arrival
              </span>
            </div>
            <h5 className="text-sm md:text-lg font-semibold py-2">
              {actualOffBlockTime ? adjustTime(actualOffBlockTime, 2) : formatTime(estimatedLandingTime)}
            </h5>
            <p className="text-lightGray text-xs md:text-sm">
              {estimatedLandingTime ? 'Amsterdam, Schiphol' : destinationIATA}
            </p>
          </div>
        </div>
        <div >
          <p className="text-primary font-bold md:text-lg">
            Price : $200
          </p>
          <p className="text-lightGray text-xs md:text-sm font-semibold">
            Round trip
          </p>
        </div>
        <div className="absolute bottom-0 right-0 ">
          <button onClick={handleBookFlight} className="bg-primary py-3 px-6 md:py-6 md:px-12 text-white rounded-tl-lg rounded-br-lg">
            Book Flight
          </button>
        </div>

        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? "max-h-40" : "max-h-0 "}`}>
          {isExpanded && (
            <div className="rounded-b-lg w-3/4 flex flex-col justify-start py-4 text-lightGray text-xs md:text-sm">
              <p className="text-primary text-sm md:text-base">Details:</p>
              <p>Flight Name : {flightName}</p>
              <p> Flight Number : {flightNumber}</p>
              <p>Terminal : {terminal}</p>
              <p className=" ">Expected Time on Belt: {expectedTimeOnBelt ? formatTime(expectedTimeOnBelt) : ""}</p>
            </div>
          )}
        </div>
      </div>

      <div onClick={toggleDetails} className="bg-mediumGray rounded-b-lg w-2/4 md:w-2/5 lg:w-1/5 flex justify-center py-2 mb-4 cursor-pointer">
        <p className="text-primary text-sm md:text-base underline underline-offset-4 text-nowrap">
          {isExpanded ? 'Hide details' : 'Check the details'}
        </p>
      </div>

      {toast.message && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
    </>
  )
}
