
import { configureStore } from '@reduxjs/toolkit';
import destinationsReducer from './slices/destinationsSlice'; // Hedefler verilerini yöneten reducer
import flightsReducer from './slices/flightsSlice'; // Uçuş verilerini yöneten reducer
import flightParamsReducer from './slices/flightParamsSlice'; // Filtre verilerini yöneten reducer
import reservationReducer from './slices/reservationSlice'; //Rezervasyon verilerini yöneten reducer

const store = configureStore({
    reducer: {
        destinations: destinationsReducer,
        flights: flightsReducer,
        flightParams: flightParamsReducer,
        rezervations: reservationReducer,
    },
});

export default store; 
