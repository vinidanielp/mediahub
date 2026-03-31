import Link from 'next/link';
import { DeleteWatchlistButton } from './delete-watchlist-button';
import type { Watchlist } from '@/types';

interface WatchlistListProps {
  watchlists: Watchlist[];
}

export function WatchlistList({ watchlists }: WatchlistListProps) {
  if (watchlists.length === 0) {
    return <p>No watchlists found.</p>;
  }

  return (
    <ul>
      {watchlists.map((wl) => (
        <li key={wl['@key']}>
          <Link href={`/watchlists/${encodeURIComponent(wl.title)}`}>
            <strong>{wl.title}</strong>
          </Link>{' '}
          {wl.description && `— ${wl.description}`}{' '}
          <Link href={`/watchlists/${encodeURIComponent(wl.title)}/edit`}>
            Edit
          </Link>{' '}
          <DeleteWatchlistButton title={wl.title} />
        </li>
      ))}
    </ul>
  );
}
