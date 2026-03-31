import Link from 'next/link';
import { readAsset } from '@/lib/api-client';
import { WatchlistEditForm } from '@/components/watchlist-edit-form';
import type { Watchlist } from '@/types';

interface EditWatchlistPageProps {
  params: Promise<{ title: string }>;
}

export default async function EditWatchlistPage({ params }: EditWatchlistPageProps) {
  const { title } = await params;
  const decodedTitle = decodeURIComponent(title);

  const watchlist = await readAsset<Watchlist>({
    '@assetType': 'watchlist',
    title: decodedTitle,
  });

  return (
    <main>
      <Link href="/watchlists">← Back to Watchlists</Link>
      <h1>Edit Watchlist</h1>
      <WatchlistEditForm watchlist={watchlist} />
    </main>
  );
}
