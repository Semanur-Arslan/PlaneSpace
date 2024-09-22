import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDestinationsAPI } from '../../api/externalApi';

// Varış Noktası verilerini çekmek için asenkron thunk oluşturdum
export const fetchDestinations = createAsyncThunk('destinations/fetchDestinations', async (page) => {
    try {
        const destinations = await fetchDestinationsAPI(page);
        return destinations;
    } catch (error) {
        throw new Error(error.message || 'Network response was not ok');
    }
});

const destinationsSlice = createSlice({
    name: 'destinations',
    initialState: {
        list: [],
        page: 0,
    },
    reducers: {
        resetDestinations: (state) => {
            state.list = [];
            state.page = 0;
        },
    },
    extraReducers: (builder) => {
        // fetchFlights thunk'ı başarılı olduğunda gelen verileri flights dizisine kaydettim.
        // Her sayfada en 19-20 veri olduğunu için verilerin tamamını alana kadar sayfa numarasını arttırdım.
        builder
            .addCase(fetchDestinations.fulfilled, (state, action) => {
                state.list = [...state.list, ...action.payload];
                if (action.payload.length > 19) {
                    state.page += 1;
                }
            });
    },
});

export const { resetDestinations } = destinationsSlice.actions;
export default destinationsSlice.reducer;



