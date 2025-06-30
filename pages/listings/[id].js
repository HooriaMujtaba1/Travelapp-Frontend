import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getListingById } from '../../services/listing';
import { getAllBookings } from '@/services/booking';
import { toast } from 'react-toastify';
import Image from 'next/image';  // Import the Image component from Next.js
import Link from 'next/link';    // Import Link for internal navigation

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
    <div className="min-h-screen bg-blue-100 p-6 text-gray-800">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Listing Info */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h1 className="text-3xl font-bold mb-4 text-blue-600">{listing.name}</h1>

          {/* External Link to Google Maps */}
          <Link href={listing.location_url} target="_blank" rel="noopener noreferrer">
            <span className="text-blue-600 underline mb-6 inline-block">
              View on Google Maps
            </span>
          </Link>

          <div className="space-y-4 mb-6">
            {listing.images?.map((img) => (
              <Image
                key={img.id}
                src={img.image}
                alt={listing.name}
                width={500}  // Adjust width based on your design
                height={300} // Adjust height based on your design
                className="w-full h-60 object-cover rounded"
              />
            ))}
          </div>

          <p className="text-gray-700 leading-relaxed">
            A tour place, also known as a tourist attraction, is a location that people
            visit for leisure, recreation, or cultural experiences. These places can be
            natural wonders like mountains, beaches, or forests, or they can be
            historical sites, cultural landmarks, or entertainment venues. The purpose of
            a tour place is to provide an engaging and enjoyable experience for visitors,
            offering opportunities for sightseeing, exploration, and relaxation. A tour place, also known as a tourist attraction, is a location that people
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
