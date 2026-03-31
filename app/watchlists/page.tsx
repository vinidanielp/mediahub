import Link from 'next/link';
import { searchAssets } from '@/lib/api-client';
import { WatchlistList } from '@/components/watchlist-list';
import type { Watchlist } from '@/types';

export default async function WatchlistsPage() {
  const watchlists = await searchAssets<Watchlist>('watchlist');

  return (
    <main>
      <Link href="/">← Back to Home</Link>
      <h1>Watchlists</h1>
      <Link href="/watchlists/create">Create Watchlist</Link>
      <WatchlistList watchlists={watchlists} />
    </main>
  );
}
