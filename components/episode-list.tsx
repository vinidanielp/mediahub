import Link from 'next/link';
import { DeleteEpisodeButton } from './delete-episode-button';
import type { Episode } from '@/types';

interface EpisodeListProps {
  episodes: Episode[];
  tvShowTitle: string;
  seasonNumber: number;
}

export function EpisodeList({ episodes, tvShowTitle, seasonNumber }: EpisodeListProps) {
  if (episodes.length === 0) {
    return <p>No episodes found.</p>;
  }

  return (
    <ul>
      {episodes.map((episode) => (
        <li key={episode['@key']}>
          <strong>Ep. {episode.episodeNumber} — {episode.title}</strong>{' '}
          ({episode.releaseDate}) — {episode.description}
          {episode.rating !== undefined && ` | Rating: ${episode.rating}`}{' '}
          <Link
            href={`/tv-shows/${encodeURIComponent(tvShowTitle)}/seasons/${seasonNumber}/episodes/${episode.episodeNumber}/edit`}
          >
            Edit
          </Link>{' '}
          <DeleteEpisodeButton
            tvShowTitle={tvShowTitle}
            seasonNumber={seasonNumber}
            episodeNumber={episode.episodeNumber}
          />
        </li>
      ))}
    </ul>
  );
}
