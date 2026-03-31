'use client';

import { createEpisodeAction } from '@/app/actions/episodes';

interface EpisodeFormProps {
  tvShowTitle: string;
  seasonNumber: number;
}

export function EpisodeForm({ tvShowTitle, seasonNumber }: EpisodeFormProps) {
  return (
    <form action={createEpisodeAction}>
      <input type="hidden" name="tvShowTitle" value={tvShowTitle} />
      <input type="hidden" name="seasonNumber" value={seasonNumber} />

      <div>
        <label htmlFor="episodeNumber">Episode Number</label>
        <input id="episodeNumber" name="episodeNumber" type="number" min="1" required />
      </div>

      <div>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" required />
      </div>

      <div>
        <label htmlFor="releaseDate">Release Date</label>
        <input id="releaseDate" name="releaseDate" type="date" required />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" required />
      </div>

      <div>
        <label htmlFor="rating">Rating (optional)</label>
        <input id="rating" name="rating" type="number" min="0" max="10" step="0.1" />
      </div>

      <button type="submit">Create Episode</button>
    </form>
  );
}
