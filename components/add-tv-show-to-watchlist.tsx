'use client';

import { addTvShowToWatchlistAction } from '@/app/actions/watchlists';
import type { TvShow } from '@/types';

interface AddTvShowToWatchlistProps {
  watchlistTitle: string;
  tvShows: TvShow[];
}

export function AddTvShowToWatchlist({ watchlistTitle, tvShows }: AddTvShowToWatchlistProps) {
  if (tvShows.length === 0) {
    return <p>No TV shows available to add.</p>;
  }

  return (
    <form action={addTvShowToWatchlistAction}>
      <input type="hidden" name="watchlistTitle" value={watchlistTitle} />

      <div>
        <label htmlFor="tvShowTitle">Select TV Show</label>
        <select id="tvShowTitle" name="tvShowTitle" required>
          <option value="">-- Select --</option>
          {tvShows.map((show) => (
            <option key={show['@key']} value={show.title}>
              {show.title}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Add to Watchlist</button>
    </form>
  );
}
