// pages/listings/index.js
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
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">All Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="bg-white shadow rounded p-4 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{listing.title}</h2>
            <p className="text-gray-600 mb-2">{listing.location}</p>
            <p className="text-blue-600 font-bold mb-2">${listing.price}</p>
            <Link
              href={`/listings/${listing.id}`}
              className="text-sm text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
