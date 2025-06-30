// pages/listings.js
import { useEffect, useState } from 'react';
import { getAllListings } from '../services/listing';

export default function ListingsPage() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    getAllListings()
      .then(setListings)
      .catch((err) => console.error('Error:', err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Listings</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div key={listing.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">{listing.name}</h2>
            <a href={listing.location_url} target="_blank" className="text-blue-600 underline">
              View on Google Maps
            </a>

            <div className="mt-3 space-y-2">
              {listing.images.map((img) => (
                <img
                  key={img.id}
                  src={img.image}
                  alt="Listing"
                  className="w-full h-40 object-cover rounded"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
