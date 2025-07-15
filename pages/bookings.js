import { useEffect, useState } from 'react';
import { getAllBookings, createBooking } from '@/services/booking';
import { getAllListings } from '@/services/listing';
import toast, { Toaster } from 'react-hot-toast';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [locationName, setLocationName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchBookings();
    fetchListings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getAllBookings();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('❌ Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const fetchListings = async () => {
    try {
      const data = await getAllListings();
      setListings(data);
    } catch (error) {
      console.error('Error fetching listings:', error);
      toast.error('❌ Failed to load listings');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!locationName || !startDate || !endDate) {
      toast.error('❌ Please fill all fields');
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      toast.error('❌ Start date must be before end date');
      return;
    }

    const matchedListing = listings.find(
      (listing) => listing.name.toLowerCase() === locationName.toLowerCase()
    );

    if (!matchedListing) {
      toast.error('❌ Listing not found. Please enter a valid listing name.');
      return;
    }

    const listingId = matchedListing.id;

    const conflict = bookings.find(
      (booking) =>
        booking.listing_details?.id === listingId &&
        new Date(startDate) <= new Date(booking.end_date) &&
        new Date(endDate) >= new Date(booking.start_date)
    );

    if (conflict) {
      toast.error('❌ This listing is already booked for the selected dates.');
      return;
    }

    try {
      await createBooking({
        listing_id: listingId,
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
      toast.error('❌ Booking failed: ' + JSON.stringify(error.response?.data || error.message));
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 p-4 sm:p-6 lg:p-12 text-gray-800">
      <Toaster position="top-right" />

      {/* Header */}
      <section className="mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-600">Your Bookings</h1>
        <p className="mt-2 text-gray-600 text-sm sm:text-base">
          Track and create your travel plans
        </p>
      </section>

      {/* Booking Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto mb-12 bg-white p-6 sm:p-8 rounded-lg shadow-md space-y-4"
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-center text-blue-500">
          📝 Book a New Listing
        </h2>

        <select
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a listing</option>
          {listings.map((l) => (
            <option key={l.id} value={l.name}>
              {l.name}
            </option>
          ))}
        </select>

        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

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
              className="bg-white rounded-lg shadow border border-gray-200 p-6 space-y-2"
            >
              <h2 className="text-lg font-semibold text-blue-700">
                {booking.listing_details?.name || booking.location_name || 'Listing Name'}
              </h2>

              {booking.listing_details?.location_url && (
                <a
                  href={booking.listing_details.location_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm"
                >
                  📍 View booked location in map
                </a>
              )}

              <p className="text-sm text-gray-600">📅 From: {booking.start_date}</p>
              <p className="text-sm text-gray-600">📅 To: {booking.end_date}</p>
              <p className="text-xs text-gray-500">
                🕒 Booked on: {new Date(booking.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
