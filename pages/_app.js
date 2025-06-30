// pages/_app.js
import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <ToastContainer position="top-center" />
    </>
  );
}
