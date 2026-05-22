import dynamic from 'next/dynamic';

// Load the entire React SPA client-side only.
const App = dynamic(() => import('../App'), { ssr: false });

export default function SpaPage() {
  return <App />;
}
