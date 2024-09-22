//filtre için parametreleri tüm uygulama componentlerinde yönetebilmek için bir slice oluşturdum.
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  route: '',
  direction: '',
  scheduleDate: '',
};

const flightParamsSlice = createSlice({
  name: 'flightParams',
  initialState,
  reducers: {
    setRoute: (state, action) => {
      state.route = action.payload;
    },
    setDirection: (state, action) => {
      state.direction = action.payload;
    },
    setScheduleDate: (state, action) => {
      state.scheduleDate = action.payload;
    },
    resetParams: () => initialState,
  },
});

export const { setPage, setRoute, setDirection, setScheduleDate, resetParams } = flightParamsSlice.actions;

export default flightParamsSlice.reducer;
