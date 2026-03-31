import Link from 'next/link';
import { DeleteSeasonButton } from './delete-season-button';
import type { Season } from '@/types';

interface SeasonListProps {
  seasons: Season[];
  tvShowTitle: string;
}

export function SeasonList({ seasons, tvShowTitle }: SeasonListProps) {
  if (seasons.length === 0) {
    return <p>No seasons found.</p>;
  }

  return (
    <ul>
      {seasons.map((season) => (
        <li key={season['@key']}>
          <strong>Season {season.number}</strong> — Year: {season.year}{' '}
          <Link
            href={`/tv-shows/${encodeURIComponent(tvShowTitle)}/seasons/${season.number}/edit`}
          >
            Edit
          </Link>{' '}
          <DeleteSeasonButton tvShowTitle={tvShowTitle} number={season.number} />
        </li>
      ))}
    </ul>
  );
}
