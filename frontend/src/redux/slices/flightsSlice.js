import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFlightsAPI } from '../../api/externalApi'

// Uçuş verilerini çekmek için asenkron thunk oluşturdum
export const fetchFlights = createAsyncThunk('flights/fetchFlights', async (params) => {
    try {
        const flights = await fetchFlightsAPI(params);
        return { flights, page: params.page };
    } catch (error) {
        throw new Error(error.message || 'Network response was not ok');
    }
});

const flightsSlice = createSlice({
    name: 'flights',
    initialState: {
        flights: [],
        page: 0,
    },
    reducers: {
        resetFlights: (state) => {
            state.flights = [];
            state.page = 0;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        // fetchFlights thunk'ı başarılı olduğunda gelen verileri flights dizisine kaydettim.
        // Veriler sayfalandırılmış olduğu için her gelen veriyi bir önceki veriye ekleyip sayfa numarasını bir arttırdım
        builder
            .addCase(fetchFlights.pending, (state) => {
                state.loading = true; 
            })
            .addCase(fetchFlights.fulfilled, (state, action) => {
                state.flights = [...state.flights, ...action.payload.flights];
                state.page = action.payload.page;
                state.loading = false;
            })
            .addCase(fetchFlights.rejected, (state) => {
                state.loading = false; 
            });
    },
});

export const { resetFlights } = flightsSlice.actions;
export default flightsSlice.reducer;
