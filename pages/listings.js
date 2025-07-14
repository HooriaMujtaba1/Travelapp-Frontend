import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image'; // Import Image for optimized image handling

export default function ListingDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [listing, setListing] = useState(null);

  // Fetch the listing data once the id is available
  useEffect(() => {
    if (!id) return;

    const fetchListing = async () => {
      try {
        const response = await fetch(`/api/listing/${id}`);
        const data = await response.json();
        setListing(data);
      } catch (err) {
        console.error('Error fetching listing data:', err);
      }
    };

    fetchListing();
  }, [id]);

  // Handle loading state
  if (!listing) return <p className="p-8 text-center text-gray-600">Loading...</p>;

  // Ensure location_url is always valid
  const locationUrl = listing.location_url || '/'; // Fallback to '/' if undefined

  return (
    <div className="min-h-screen bg-blue-100 p-6 text-gray-800">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Listing Info */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h1 className="text-3xl font-bold mb-4 text-blue-600">{listing.name}</h1>

          {/* External Link to Google Maps */}
          {locationUrl !== '/' ? (
            <Link href={locationUrl}>
              <span
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline mb-6 inline-block"
              >
                View on Google Maps
              </span>
            </Link>
          ) : (
            <p className="text-red-600">Location URL not available</p>
          )}

          <div className="space-y-4 mb-6">
            {listing.images?.length > 0 ? (
              listing.images.map((img) => (
                <img
                  key={img.id}
                  src={img.image} // Full image URL from your backend
                  alt={listing.name}
                  className="w-full h-60 object-cover rounded"
                  loading="lazy"
                />
              ))
            ) : (
              <p className="text-gray-500 italic">No images available</p>
            )}
          </div>


          <p className="text-gray-700 leading-relaxed">
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