import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations } from '../../redux/slices/reservationSlice';
import MyFlightsCard from '../../components/MyFlightsCard/index'

export default function Index() {

  const dispatch = useDispatch();
  const { reservations, loading } = useSelector((state) => state.rezervations);

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  return (
    <div className='bg-secondary h-screen'>
      <h3 className='font-bold text-lg py-4'>My Flights</h3>
      <div className="max-h-screen overflow-y-auto pb-12">
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
