import Link from 'next/link';
import { WatchlistForm } from '@/components/watchlist-form';

export default function CreateWatchlistPage() {
  return (
    <main>
      <Link href="/watchlists">← Back to Watchlists</Link>
      <h1>Create Watchlist</h1>
      <WatchlistForm />
    </main>
  );
}
