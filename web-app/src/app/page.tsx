import MapPage from '@/components/MapPage';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  return (
    <main className="flex h-screen gap-6 p-6">
      <Sidebar />

      <div className="flex-1 overflow-clip rounded-4xl border border-neutral-300">
        <MapPage />
      </div>
    </main>
  );
}
