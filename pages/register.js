import { useState } from 'react';
import { register } from '../services/auth';
import { useRouter } from 'next/router';

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password_confirm: '',
  });

  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.password_confirm) {
      return alert('❌ Passwords do not match');
    }
    try {
      await register(form);
      alert('✅ Registration successful');
      router.push('/login');
    } catch (err) {
      console.error('Backend error:', err.response?.data);
      alert('❌ ' + JSON.stringify(err.response?.data));
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-blue-500">Register</h2>

        {[
          { name: 'username', type: 'text' },
          { name: 'email', type: 'email' },
          { name: 'first_name', type: 'text' },
          { name: 'last_name', type: 'text' },
          { name: 'password', type: 'password' },
          { name: 'password_confirm', type: 'password' },
        ].map(({ name, type }) => (
          <input
            key={name}
            name={name}
            type={type}
            placeholder={
              name.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())
            }
            value={form[name]}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        ))}

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
