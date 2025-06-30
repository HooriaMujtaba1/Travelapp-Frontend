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
    <div className="min-h-screen bg-[url('/images/bg.jpg')] bg-cover bg-center flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 backdrop-blur-md p-8 rounded-xl shadow-lg w-96 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-white">Forgot Password</h2>

        {sent ? (
          <p className="text-green-400 text-center">✅ Reset link sent! Check your email.</p>
        ) : (
          <>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-white/40 rounded-md bg-white/5 text-white placeholder-white/70 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full py-2 bg-white/30 text-white font-semibold rounded-md hover:bg-white/50"
            >
              Send Reset Link
            </button>
          </>
        )}
      </form>
    </div>

  );
}
