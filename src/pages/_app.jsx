import { HelmetProvider } from 'react-helmet-async';
// Global CSS — all must be imported here in Next.js (not inside components)
import '../App.css';
import '../globals.css';
import 'aos/dist/aos.css';
import 'react-quill/dist/quill.snow.css';
import '../Components/LandingPage/FootPrint.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <HelmetProvider>
      <Component {...pageProps} />
    </HelmetProvider>
  );
}
