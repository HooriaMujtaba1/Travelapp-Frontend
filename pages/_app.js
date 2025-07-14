import Navbar from '@/components/Navbar'; // ✅ Correct path
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
