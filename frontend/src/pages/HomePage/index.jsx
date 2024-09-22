import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFlights, resetFlights } from '../../redux/slices/flightsSlice';
import { fetchDestinations } from '../../redux/slices/destinationsSlice';
import FlightSelection from '../../components/FlightSelection/index';
import FlightCard from '../../components/FlightCard/index';
import RoutingCard from '../../components/RoutingCard/index';
import Filters from '../../components/Filters/index';
import card1 from '../../images/card1.jpg';
import card2 from '../../images/card2.jpg';
import card3 from '../../images/card3.jpg';
import { PiCarLight } from "react-icons/pi";
import { PiBuildingLight } from "react-icons/pi";
import { FaUmbrellaBeach } from "react-icons/fa";


export default function Index() {

  const dispatch = useDispatch();

  // Ansayfada gerekli olan veriler için api isteği yapan fonksiyonları çalıştırdım.
  useEffect(() => {
    dispatch(resetFlights());
    dispatch(fetchFlights({ page: 0 }));
    dispatch(fetchDestinations());
  }, [dispatch]);

  // Uçuş verilerini ve parametre değerlerini Redux'tan aldım.
  const { flights, page, loading } = useSelector((state) => state.flights);
  const {route, direction, scheduleDate} =useSelector((state) => state.flightParams)

  //Uçuş verileri sayfa açıldığında ilk sayfası gelmektedir. İlk veri setindeki listenen uçuşlar tamamlnadığında 'load more' butonuna tıklanır ve bir sonraki sayfadaki verileri almak için api isteği gerçeklştirdim
  //Diğer sayfalara geçildiğinde aynı parametreler ile devam etmesi için parametreleri ekledim.
  const loadMoreFlights = () => {
    const nextPage = page + 1; 
    dispatch(fetchFlights({ page: nextPage, direction, route, scheduleDate }));
};


  // Anasayfada soldaki kart yapısı için veriseti oluşturdum.
  const routingCardsData = [
    {
      src: card1,
      alt: "car rentals",
      overlayColor: "bg-overlayOrange",
      Icon: PiCarLight,
      text: "CAR RENTALS",
    },
    {
      src: card2,
      alt: "hotels",
      overlayColor: "bg-overlayBlue",
      Icon: PiBuildingLight,
      text: "HOTELS",
    },
    {
      src: card3,
      alt: "travel packages",
      overlayColor: "bg-overlayGreen",
      Icon: FaUmbrellaBeach,
      text: "TRAVEL PACKAGES",
    },
  ];


  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
      <div className="col-span-1 md:col-span-5">
        <FlightSelection />
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          <div className="col-span-1 md:col-span-3  " >
            {/* Eğer uçuş verisi varsa map fonksiyonu ile her bir uçuş için bir kart oluşturdum. */}
            <div className="max-h-screen overflow-y-auto">
              <div className="p-2 text-center text-lightGray">
                {loading && flights.length === 0 && <div >Loading...</div>}
                {!loading && flights.length === 0 && <div >Not Available</div>}
              </div>
              {flights.map(flight => (
                <FlightCard key={flight.id} flight={flight} />
              ))}
              {loading && flights.length > 0 && <div className="p-2 text-center text-lightGray">Loading more flights...</div>}
              {
                flights && flights.length > 0 && !loading &&
                <div>
                  <div className='flex justify-center mb-12 text-sm text-darkGray font-bold  '>
                    <button onClick={loadMoreFlights} className='border rounded-lg border-darkGray p-2 hover:bg-darkGray hover:text-white'>
                      Load more
                    </button>
                  </div>
                </div>
              }
            </div>
          </div>
          <div className="col-span-1 mt-2 md:px-1 order-first md:order-last">
            <Filters />
          </div>
        </div>
      </div>

      {/* Kartlar için oluşturduğum component'i render ettim */}
      <div className="flex flex-col gap-4 font-bold">
        {routingCardsData.map((card, index) => (
          <RoutingCard
            key={index}
            src={card.src}
            alt={card.alt}
            overlayColor={card.overlayColor}
            Icon={card.Icon}
            text={card.text}
          />
        ))}
      </div>
    </div>
  )
}

