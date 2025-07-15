// components/Navbar.js
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-700 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* App name */}
        <Link href="/" className="text-2xl font-bold hover:text-gray-200">
          🧭 TravelApp
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Links */}
        <div className={`flex-col md:flex-row md:flex space-y-4 md:space-y-0 md:space-x-6 text-lg absolute md:static bg-blue-700 md:bg-transparent w-full md:w-auto left-0 top-full p-6 md:p-0 transition-all duration-300 ease-in-out ${isOpen ? 'flex' : 'hidden'}`}>
          <Link href="/" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>
            Listings
          </Link>
          <Link href="/bookings" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>
            Bookings
          </Link>
          <Link href="/login" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>
            Login
          </Link>
          <Link href="/register" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
