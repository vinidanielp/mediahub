'use client';

import { updateTvShowAction } from '@/app/actions/tv-shows';
import type { TvShow } from '@/types';

interface TvShowEditFormProps {
  tvShow: TvShow;
}

export function TvShowEditForm({ tvShow }: TvShowEditFormProps) {
  return (
    <form action={updateTvShowAction}>
      <input type="hidden" name="title" value={tvShow.title} />

      <div>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" defaultValue={tvShow.title} disabled />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" defaultValue={tvShow.description} required />
      </div>

      <div>
        <label htmlFor="recommendedAge">Recommended Age</label>
        <input id="recommendedAge" name="recommendedAge" type="number" min="0" defaultValue={tvShow.recommendedAge} required />
      </div>

      <button type="submit">Update TV Show</button>
    </form>
  );
}
