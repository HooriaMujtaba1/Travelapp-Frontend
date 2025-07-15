import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getListingById } from '../../services/listing';
import { getAllBookings } from '@/services/booking';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function ListingDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [listing, setListing] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const listingData = await getListingById(id);
        setListing(listingData);

        const allBookings = await getAllBookings();
        const relatedBookings = allBookings.filter(
          (b) => String(b.listing) === String(id)
        );
        setBookings(relatedBookings);
      } catch (err) {
        console.error('Error fetching data:', err);
        toast.error('Failed to load listing data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading)
    return <p className="p-8 text-center text-gray-600">Loading...</p>;

  if (!listing)
    return (
      <p className="p-8 text-center text-red-600 font-semibold">
        Listing not found
      </p>
    );

  return (
    <div className="min-h-screen bg-blue-100 px-4 sm:px-6 lg:px-8 py-8 text-gray-800">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Listing Info */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-blue-600">{listing.name}</h1>

          {/* Google Maps Link */}
          {listing.location_url ? (
            <Link
              href={listing.location_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mb-4 inline-block text-sm sm:text-base"
            >
              View on Google Maps
            </Link>
          ) : (
            <p className="text-sm text-red-500">Location URL not available</p>
          )}

          {/* Images */}
          <div className="space-y-4 mb-6">
            {listing.images?.length > 0 ? (
              listing.images.map((img) => (
                <img
                  key={img.id}
                  src={img.image}
                  alt={listing.name}
                  loading="lazy"
                  className="w-full h-52 sm:h-60 md:h-72 object-cover rounded-md"
                />
              ))
            ) : (
              <p className="text-gray-500 italic">No images available</p>
            )}
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            A tour place, also known as a tourist attraction, is a location that people
            visit for leisure, recreation, or cultural experiences. These places can be
            natural wonders like mountains, beaches, or forests, or they can be
            historical sites, cultural landmarks, or entertainment venues. The purpose of
            a tour place is to provide an engaging and enjoyable experience for visitors,
            offering opportunities for sightseeing, exploration, and relaxation.
          </p>
        </div>
      </div>
    </div>
  );
}
