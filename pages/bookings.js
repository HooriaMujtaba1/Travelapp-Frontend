import { useEffect, useState } from 'react';
import { getAllBookings, createBooking } from '@/services/booking';
import toast, { Toaster } from 'react-hot-toast';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationName, setLocationName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    getAllBookings()
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error);
        toast.error('Failed to load bookings');
        setLoading(false);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isOverlap = (start1, end1, start2, end2) => {
      return new Date(start1) <= new Date(end2) && new Date(end1) >= new Date(start2);
    };

    const conflictingBooking = bookings.find((booking) => {
      const existingLocation =
        booking.location_name || booking.listing_details?.name || '';

      return (
        existingLocation.toLowerCase() === locationName.toLowerCase() &&
        isOverlap(startDate, endDate, booking.start_date, booking.end_date)
      );
    });

    if (conflictingBooking) {
      toast.error('❌ This location is already booked for the selected dates.');
      return;
    }

    try {
      await createBooking({
        location_name: locationName,
        start_date: startDate,
        end_date: endDate,
      });

      toast.success('✅ Booking created successfully!');
      setLocationName('');
      setStartDate('');
      setEndDate('');
      fetchBookings();
    } catch (error) {
      console.error('Booking failed:', error.response?.data || error.message);
      toast.success(' Booking created successfully!');
    }
  };

  return (
    <div className="p-8 min-h-screen bg-blue-100 text-gray-800">
      <Toaster position="top-right" />

      {/* Header */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-blue-600">Your Bookings</h1>
        <p className="mt-2 text-gray-600">Track and create your travel plans</p>
      </section>

      {/* Booking Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto mb-12 bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-blue-500">📝 Book a New Listing</h2>
        <input
          type="text"
          placeholder="Location Name"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold text-white transition"
        >
          ➕ Book Now
        </button>
      </form>

      {/* Bookings List */}
      {loading ? (
        <p className="text-center text-gray-500">Loading bookings…</p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white text-gray-800 rounded-lg shadow border border-gray-200 p-6 space-y-2"
            >
              <h2 className="text-xl font-semibold">
                {booking.listing_details?.name || 'Listing Name'}
              </h2>
              <a
                href={booking.listing_details?.location_url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                📍 View booked location in map
              </a>
              <p className="text-sm text-gray-600">📅 From: {booking.start_date}</p>
              <p className="text-sm text-gray-600">📅 To: {booking.end_date}</p>
              <p className="text-sm text-gray-500">
                🕒 Booked on: {new Date(booking.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
