'use client';

import { updateWatchlistAction } from '@/app/actions/watchlists';
import type { Watchlist } from '@/types';

interface WatchlistEditFormProps {
  watchlist: Watchlist;
}

export function WatchlistEditForm({ watchlist }: WatchlistEditFormProps) {
  return (
    <form action={updateWatchlistAction}>
      <input type="hidden" name="title" value={watchlist.title} />

      <div>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" defaultValue={watchlist.title} disabled />
      </div>

      <div>
        <label htmlFor="description">Description (optional)</label>
        <textarea id="description" name="description" defaultValue={watchlist.description} />
      </div>

      <button type="submit">Update Watchlist</button>
    </form>
  );
}
