import { useState } from 'react';
import api from '../utils/axiosInstance';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/password_reset/', { email });
      setSent(true);
    } catch (err) {
      console.error(err.response?.data || err);
      alert('❌ ' + JSON.stringify(err.response?.data));
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-xl shadow-md w-full max-w-sm sm:max-w-md space-y-4"
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-center text-blue-500">
          Forgot Password
        </h2>

        {sent ? (
          <p className="text-green-500 text-center text-sm sm:text-base">
            ✅ Reset link sent! Check your email.
          </p>
        ) : (
          <>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              required
            />
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              Send Reset Link
            </button>
          </>
        )}
      </form>
    </div>
  );
}
