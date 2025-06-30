// services/booking.js
import api from '../utils/axiosInstance';

// ✅ Do NOT import getAllBookings from the same file
// ❌ REMOVE this line:
// import { getAllBookings } from '@/services/booking';

// ✅ Fetch all bookings
export const getAllBookings = async () => {
  const response = await api.get('/bookings/');
  return response.data;
};

// ✅ Create a new booking
export const createBooking = async (bookingData) => {
  const response = await api.post('/bookings/', bookingData); // 🔁 Leading slash is correct
  return response.data;
};
