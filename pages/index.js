import { useEffect, useState } from 'react';
import { getAllListings } from '../services/listing';

export default function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllListings()
      .then((data) => {
        setListings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed, until Logged in.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-8 text-center text-gray-600">Loading listings…</p>;
  if (error) return <p className="p-8 text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-blue-100 p-8 text-gray-800">
      {/* Hero section */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-blue-600">Welcome to Nomadic Travel</h1>
        <p className="mt-2 text-gray-600">Find your next adventure</p>
      </section>

      {/* Listings grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200"
          >
            {item.images?.[0] && (
              <img
                src={item.images[0].image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">{item.name}</h2>
              <p className="text-gray-700 mb-4">
                {item.description?.slice(0, 100)} A tour place, also known as a tourist
                attraction, is a location that people visit for leisure, recreation, or cultural
                experiences. A tour place, also known as a tourist
                attraction, is a location that people visit for leisure, recreation or 
                experiences.               
              </p>

              <div className="flex flex-wrap gap-2">
                <a
                  href={`/bookings`}
                  className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  Book Now
                </a>

                <a
                  href={`/listings/${item.id}`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
