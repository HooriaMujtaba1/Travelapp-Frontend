import { useState } from 'react';
import { login } from '../services/auth';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Link from 'next/link'; // Import Link for internal navigation

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { access } = await login({ username, password });
      Cookies.set('accessToken', access, { expires: 1 });
      alert('✅ Login successful');
      router.push('/');
    } catch (err) {
      console.error(err.response?.data || err);
      alert('🚫 ' + JSON.stringify(err.response?.data));
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-blue-500">Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          required
        />

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Sign In
        </button>

        {/* Forgot password link using Link component from Next.js */}
        <div className="text-right">
          <Link href="/forgot-password" className="text-sm text-blue-500 hover:underline">
            Forgot password?
          </Link>
        </div>
      </form>
    </div>
  );
}
