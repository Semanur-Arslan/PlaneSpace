import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchReservationsAPI } from '../../api/backendApi'; 

// Rezervasyonları çekmek için asenkron thunk oluşturdum
export const fetchReservations = createAsyncThunk('reservations/fetchReservations', async (_, { rejectWithValue }) => {
    try {
        const data = await fetchReservationsAPI(); 
        console.log(data);
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const reservationSlice = createSlice({
    name: 'reservations',
    initialState: {
        reservations: [],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReservations.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchReservations.fulfilled, (state, action) => {
                state.loading = false;
                state.reservations = action.payload;
            })
            .addCase(fetchReservations.rejected, (state, action) => {
                state.loading = false;
            });
    },
});

export default reservationSlice.reducer;
