import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations } from '../../redux/slices/reservationSlice';
import MyFlightsCard from '../../components/MyFlightsCard/index'

export default function Index() {

  const dispatch = useDispatch();
  const { reservations, loading } = useSelector((state) => state.rezervations);

  // Sayfa açıldığında rezervasyon verileri için API isteği yapacak olan fonksiyonu çağırdım.
  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  return (
    <div className='bg-secondary h-full'>
      <h3 className='font-bold text-lg py-4'>My Flights</h3>
      <div style={{ height: `calc(100vh)` }}  className="overflow-y-auto">
      {/* Eğer rezervasyon verisi varsa map fonksiyonu ile her bir rezervasyon için oluşturduğum kartı render ettim. */}
      {loading ? (
          <p>Loading...</p>
        ) : reservations.length === 0 ? (
          <p>Reservation not found</p>
        ) : (
          reservations.map((reservation) => (
            <MyFlightsCard key={reservation._id} reservation={reservation} />
          ))
        )}
        </div>
      </div>
  )
}
