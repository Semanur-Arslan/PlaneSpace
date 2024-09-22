import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlights, resetFlights } from "../../redux/slices/flightsSlice";
import { setDirection, setRoute } from "../../redux/slices/flightParamsSlice";

export default function Index() {
  const dispatch = useDispatch();
  const { route, direction, scheduleDate } = useSelector(state => state.flightParams);
  const [selectedDirection, setSelectedDirection] = useState("");

  //Eğer kalkış ve varış noktası seçilmişse o yöne göre yön filtresinin güncellenmesi için useEffect ekledim.
  //Yöne göre sıralama yapacağı için var olan verilerin altına eklemesi için verileri resetledim.
  // Burada seçili yönü belirledim ve bu yön ile API isteğini gerçekleştirecek olan fonksiyonu çağırdım.

  useEffect(() => {
    if (direction) {
      setSelectedDirection(direction);
    }
  }, [direction]);

  useEffect(() => {
    if (selectedDirection) {
      dispatch(resetFlights());
      dispatch(fetchFlights({ scheduleDate, direction: selectedDirection, route, page: 0 }));
    }
  }, [selectedDirection, scheduleDate, route, dispatch]);

  const handleChange = (event) => {
    const newDirection = event.target.value;
    dispatch(setDirection(newDirection));
    dispatch(setRoute(''));
  };

  return (
    <div >
      <h3 className="font-bold py-2 ">Flight Direction</h3>
      <div className="flex flex-row md:flex-col gap-x-4">
      <div className="py-1 ">
        <label>
          <input
            type="radio"
            name="direction"
            value="A"
            checked={selectedDirection === "A"}
            onChange={handleChange}
            className="me-2"
          />
          A Direction
        </label>
      </div>
      <div className="py-1">
        <label>
          <input
            type="radio"
            name="direction"
            value="D"
            checked={selectedDirection === "D"}
            onChange={handleChange}
            className="me-2"
          />
          D Direction
        </label>
      </div>
      </div>
    </div>
  );
}

