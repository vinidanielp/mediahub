'use client';

import { createTvShowAction } from '@/app/actions/tv-shows';

export function TvShowForm() {
  return (
    <form action={createTvShowAction}>
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" required />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" required />
      </div>

      <div>
        <label htmlFor="recommendedAge">Recommended Age</label>
        <input id="recommendedAge" name="recommendedAge" type="number" min="0" required />
      </div>

      <button type="submit">Create TV Show</button>
    </form>
  );
}
