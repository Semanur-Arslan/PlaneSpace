// Uçuşlar API'sine istek göndermek için Axios tabanlı bir istemci oluşturdum.
// Uçuş ile ilgili verileri almak için gereçkleştireceğim API isteklerini tek bir dosyadan yönettim.
import axios from 'axios';

const api = axios.create({
    baseURL: '/public-flights',
    headers: {
        'Accept': 'application/json',
        'app_id': '7ca0a566',
        'app_key': 'b6c7ddc5c0f35b4b552805216b61ee3a',
        'ResourceVersion': 'v4',
    },
});

// Uçuş verileri
export const fetchFlightsAPI = async ({ page, direction, route, scheduleDate }) => {
    const params = {
        ...(scheduleDate && { scheduleDate }),
        ...(direction && { flightDirection: direction }),
        ...(route && { route }),
        includedelays: false,
        page,
        sort: '+scheduleTime',
    };

    const response = await api.get('/flights', { params });
    return Array.isArray(response.data.flights)
        ? response.data.flights
        : response.data.flight
            ? [response.data.flight]
            : [];
};

// Varış Noktası verileri
export const fetchDestinationsAPI = async (page) => {
    const response = await api.get('/destinations', {
        params: {
            page,
            sort: '+iata',
        },
    });
    return response.data.destinations;
};
