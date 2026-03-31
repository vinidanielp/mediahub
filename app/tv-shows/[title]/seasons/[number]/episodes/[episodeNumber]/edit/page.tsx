import Link from 'next/link';
import { readAsset } from '@/lib/api-client';
import { EpisodeEditForm } from '@/components/episode-edit-form';
import type { Episode } from '@/types';

interface EditEpisodePageProps {
  params: Promise<{ title: string; number: string; episodeNumber: string }>;
}

export default async function EditEpisodePage({ params }: EditEpisodePageProps) {
  const { title, number, episodeNumber } = await params;
  const decodedTitle = decodeURIComponent(title);
  const seasonNumber = Number(number);

  const episode = await readAsset<Episode>({
    '@assetType': 'episodes',
    season: {
      '@assetType': 'seasons',
      number: seasonNumber,
      tvShow: { '@assetType': 'tvShows', title: decodedTitle },
    },
    episodeNumber: Number(episodeNumber),
  });

  return (
    <main>
      <Link href={`/tv-shows/${encodeURIComponent(decodedTitle)}/seasons/${seasonNumber}`}>
        ← Back to Season {seasonNumber}
      </Link>
      <h1>Edit Episode {episodeNumber}</h1>
      <EpisodeEditForm episode={episode} tvShowTitle={decodedTitle} seasonNumber={seasonNumber} />
    </main>
  );
}
