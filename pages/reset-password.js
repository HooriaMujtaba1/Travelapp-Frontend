import { useState } from 'react';
import api from '../utils/axiosInstance';

export default function ResetPassword() {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token || !password) {
      alert('❌ Token and password are required.');
      return;
    }

    try {
      await api.post('/password_reset/confirm/', {
        token,
        password,
      });
      setStatus('success');
    } catch (err) {
      console.error(err.response?.data || err);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-lg shadow-md sm:p-8 p-6 space-y-6"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 text-center">
          Reset Password
        </h2>

        {status === 'success' ? (
          <p className="text-green-600 text-center font-medium sm:text-base text-sm">
            ✅ Password reset successful! You can now log in.
          </p>
        ) : (
          <>
            <input
              type="text"
              placeholder="Token (from email)"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
              required
            />

            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
              required
            />

            <button
              type="submit"
              className="w-full py-2 sm:py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              Reset Password
            </button>

            {status === 'error' && (
              <p className="text-red-600 text-center text-sm sm:text-base font-medium">
                ❌ Reset failed. Token may be invalid or expired.
              </p>
            )}
          </>
        )}
      </form>
    </div>
  );
}
