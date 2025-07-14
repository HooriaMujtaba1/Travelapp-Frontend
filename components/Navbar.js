// components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* App name */}
        <Link href="/" className="text-2xl font-bold hover:text-gray-200">
          🧭 TravelApp
        </Link>

        {/* Links */}
        <div className="space-x-6 text-lg">
          <Link href="/" className="hover:text-gray-300">
            Listings
          </Link>
          <Link href="/bookings" className="hover:text-gray-300">
            Bookings
          </Link>
          <Link href="/login" className="hover:text-gray-300">
            Login
          </Link>
          <Link href="/register" className="hover:text-gray-300">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}