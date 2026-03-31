'use client';

import { createWatchlistAction } from '@/app/actions/watchlists';

export function WatchlistForm() {
  return (
    <form action={createWatchlistAction}>
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" required />
      </div>

      <div>
        <label htmlFor="description">Description (optional)</label>
        <textarea id="description" name="description" />
      </div>

      <button type="submit">Create Watchlist</button>
    </form>
  );
}
