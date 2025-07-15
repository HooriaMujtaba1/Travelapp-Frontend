import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllListings } from '@/services/listing';

export default function ListingsPage() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    getAllListings()
      .then(setListings)
      .catch((err) => console.error('Failed to fetch listings:', err));
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 px-4 py-8 sm:px-6 lg:px-12 text-gray-800">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-blue-700">
        All Listings
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between hover:shadow-lg transition duration-300"
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-2 text-blue-800">
              {listing.title}
            </h2>
            <p className="text-gray-600 text-sm mb-1">{listing.location}</p>
            <p className="text-blue-600 font-semibold mb-3">${listing.price}</p>
            <Link
              href={`/listings/${listing.id}`}
              className="inline-block text-center text-sm sm:text-base bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
