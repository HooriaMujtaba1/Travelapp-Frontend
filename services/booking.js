// services/booking.js
import api from '@/utils/axiosInstance';

// ✅ Get all bookings
export const getAllBookings = async () => {
  const response = await api.get('/bookings/');
  return response.data;
};

// ✅ Create a new booking
export const createBooking = async (bookingData) => {
  const response = await api.post('/bookings/', bookingData);
  return response.data;
};
