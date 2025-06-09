/**
 * Next.js App component
 * Global app wrapper with Tailwind CSS styles
 */

import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
