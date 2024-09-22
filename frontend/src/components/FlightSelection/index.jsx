import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { IoIosAirplane } from "react-icons/io";
import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";
import { fetchDestinations } from "../../redux/slices/destinationsSlice";
import { fetchFlights, resetFlights } from "../../redux/slices/flightsSlice";
import SelectAirport from "../SelectAirport";
import SelectDate from '../SelectDate/index';
import formatDate from "../../utils/dateFormatter";
import { setDirection, setScheduleDate, setRoute } from "../../redux/slices/flightParamsSlice";

export default function Index() {

    const dispatch = useDispatch();
    const { route } = useSelector(state => state.flightParams);

    const [selected, setSelected] = useState("round-trip");
    const [departureAirport, setDepartureAirport] = useState("");
    const [arrivalAirport, setArrivalAirport] = useState("");
    const [departureDate, setDepartureDate] = useState(null);
    const [arrivalDate, setArrivalDate] = useState(null);

    //Eğer yön seçilmişse, kalkış ve varış noktasına göre sıralama yapmaması için seçili değeri sıfırladım.
    useEffect(() => {
        if (!route) {
            setDepartureAirport("");
            setArrivalAirport("");
        }
    }, [route]);

    // Varış noktalarını select içerisinde listelemek için Redux'a kaydettiğim destination değerlerini aldım.
    const { list: destinations, page: optionPage } = useSelector((state) => state.destinations);

    // Api isteğini her gerçekleştirdiğimde 20 adet veri gelmektedir. Select içerisinde scroll yaptıkça bir sonraki veri setinin yüklenmsi için istek fonksiyonunu çağırdım.
    const fetchMoreDestinations = () => {
        dispatch(fetchDestinations(optionPage));
    };

    // Select yapısında seçilen değerleri alan fonksiyonlar oluşturdum
    const handleDepartureSelect = (airport) => {
        setDepartureAirport(airport);
        setArrivalAirport({ publicName: { english: "Amsterdam, Schiphol" } });
    };

    const handleArrivalSelect = (airport) => {
        setArrivalAirport(airport);
        setDepartureAirport({ publicName: { english: "Amsterdam, Schiphol" } });
    };

    //Butona tıklandığında arama verilerine göre API isteği yapan fonksiyonu çalıştırıyorum
    const showFlights = () => {
        dispatch(resetFlights());

        const page = 0;
        const selectRoute = departureAirport?.iata || departureAirport?.icao || arrivalAirport?.iata || arrivalAirport?.icao || '';
        const selectDirection = departureAirport.publicName?.english !== 'Amsterdam, Schiphol'
            ? 'A'
            : arrivalAirport.publicName?.english !== 'Amsterdam, Schiphol'
                ? 'D'
                : '';

        const selectScheduleDate = departureDate
            ? formatDate(departureDate)
            : arrivalDate
                ? formatDate(arrivalDate)
                : '';


        // Filtre seçimlerini redux'a kaydettim, çünkü diğer filtreleme işlemlerinde bu değerlerde değişiklik yapmak isteyebilirim
        dispatch(setRoute(selectRoute));
        dispatch(setDirection(selectDirection));
        dispatch(setScheduleDate(selectScheduleDate))

        const filters = {
            page,
            direction: selectDirection,
            route: selectRoute,
            scheduleDate: selectScheduleDate
        };

        dispatch(fetchFlights(filters));
    };


    return (
        <div className='bg-white p-4 rounded-lg mb-4'>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                <div className="flex items-center space-x-2">
                    <IoIosAirplane size={20} color="#5b21b6" />
                    <p className="text-sm">
                        BOOK YOUR FLIGHT
                    </p>
                </div>
                <div className="md:flex justify-end mt-4 md:mt-0">
                    <div className="flex text-sm text-nowrap">
                        <button
                            onClick={() => setSelected("round-trip")}
                            className={`flex-1 text-center py-2 px-4 rounded-l-2xl transition-colors duration-300 
                            ${selected === "round-trip" ? "bg-primary text-white" : "bg-secondary text-primary"}`}
                        >
                            Round trip
                        </button>
                        <button
                            onClick={() => setSelected("one-way")}
                            className={`flex-1 text-center py-2 px-4 rounded-r-2xl transition-colors duration-300 
                            ${selected === "one-way" ? "bg-primary text-white" : "bg-secondary text-primary"}`}
                        >
                            One way
                        </button>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="grid grid-cols-2 gap-2">
                    <SelectAirport
                        icon={FaPlaneDeparture}
                        options={destinations}
                        selectedOption={departureAirport?.publicName?.english}
                        onOptionClick={handleDepartureSelect}
                        rounded='left'
                        fetchMore={fetchMoreDestinations}
                    />

                    <SelectAirport
                        icon={FaPlaneArrival}
                        options={destinations}
                        selectedOption={arrivalAirport?.publicName?.english}
                        onOptionClick={handleArrivalSelect}
                        rounded='right'
                        fetchMore={fetchMoreDestinations}
                    />
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <SelectDate
                        selectedDate={departureDate}
                        onDateChange={setDepartureDate}
                        rounded="left"
                    />
                    {selected === 'round-trip' &&
                        <SelectDate
                            selectedDate={arrivalDate}
                            onDateChange={setArrivalDate}
                            rounded="right"
                        />
                    }
                </div>
            </div>
            <div className="mt-8">
                <button onClick={showFlights} className="bg-primary text-white px-4 py-2 rounded-lg">
                    Show Flights
                </button>
            </div>
        </div>
    );
}
