// Rezervasyon API'sine istek göndermek için Axios tabanlı bir istemci oluşturdum.
// Rezervasyon işlemlerini gerçekleştiren API isteklerini tek bir dosyadan yönettim.
import axios from 'axios';

const BACKEND_BASE_URL = 'http://127.0.0.1:3001/api';

const apiClient = axios.create({
    baseURL: BACKEND_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Rezervasyon oluşturma
export const createReservationAPI = async (reservationData) => {
    try {
        const response = await apiClient.post('/rezervations', reservationData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Reservation could not be saved');
    }
};

// Rezervasyonları alma
export const fetchReservationsAPI = async () => {
    try {
        const response = await apiClient.get('/rezervations');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'There was a problem retrieving reservations');
    }
};

// Rezervasyon silme
export const deleteReservationAPI = async (id) => {
    try {
        const response = await apiClient.delete(`/rezervations/${id}`); 
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Reservation could not be deleted');
    }
};



