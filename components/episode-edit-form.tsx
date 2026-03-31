'use client';

import { updateEpisodeAction } from '@/app/actions/episodes';
import type { Episode } from '@/types';

interface EpisodeEditFormProps {
  episode: Episode;
  tvShowTitle: string;
  seasonNumber: number;
}

export function EpisodeEditForm({ episode, tvShowTitle, seasonNumber }: EpisodeEditFormProps) {
  return (
    <form action={updateEpisodeAction}>
      <input type="hidden" name="tvShowTitle" value={tvShowTitle} />
      <input type="hidden" name="seasonNumber" value={seasonNumber} />
      <input type="hidden" name="episodeNumber" value={episode.episodeNumber} />

      <div>
        <label htmlFor="episodeNumber">Episode Number</label>
        <input id="episodeNumber" type="number" defaultValue={episode.episodeNumber} disabled />
      </div>

      <div>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" defaultValue={episode.title} required />
      </div>

      <div>
        <label htmlFor="releaseDate">Release Date</label>
        <input id="releaseDate" name="releaseDate" type="date" defaultValue={episode.releaseDate?.split('T')[0]} required />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" defaultValue={episode.description} required />
      </div>

      <div>
        <label htmlFor="rating">Rating (optional)</label>
        <input id="rating" name="rating" type="number" min="0" max="10" step="0.1" defaultValue={episode.rating} />
      </div>

      <button type="submit">Update Episode</button>
    </form>
  );
}
