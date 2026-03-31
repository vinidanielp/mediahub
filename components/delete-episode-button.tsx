'use client';

import { deleteEpisodeAction } from '@/app/actions/episodes';

interface DeleteEpisodeButtonProps {
  tvShowTitle: string;
  seasonNumber: number;
  episodeNumber: number;
}

export function DeleteEpisodeButton({ tvShowTitle, seasonNumber, episodeNumber }: DeleteEpisodeButtonProps) {
  return (
    <form action={deleteEpisodeAction}>
      <input type="hidden" name="tvShowTitle" value={tvShowTitle} />
      <input type="hidden" name="seasonNumber" value={seasonNumber} />
      <input type="hidden" name="episodeNumber" value={episodeNumber} />
      <button type="submit">Delete</button>
    </form>
  );
}
