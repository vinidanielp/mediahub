import Link from 'next/link';
import { readAsset, searchAssets } from '@/lib/api-client';
import { EpisodeList } from '@/components/episode-list';
import type { Season, Episode } from '@/types';

interface SeasonDetailPageProps {
  params: Promise<{ title: string; number: string }>;
}

export default async function SeasonDetailPage({ params }: SeasonDetailPageProps) {
  const { title, number } = await params;
  const decodedTitle = decodeURIComponent(title);
  const seasonNumber = Number(number);

  const season = await readAsset<Season>({
    '@assetType': 'seasons',
    number: seasonNumber,
    tvShow: { '@assetType': 'tvShows', title: decodedTitle },
  });

  const episodes = await searchAssets<Episode>('episodes', {
    season: {
      '@assetType': 'seasons',
      number: seasonNumber,
      tvShow: { '@assetType': 'tvShows', title: decodedTitle },
    },
  });

  return (
    <main>
      <Link href={`/tv-shows/${encodeURIComponent(decodedTitle)}`}>← Back to {decodedTitle}</Link>
      <h1>{decodedTitle} — Season {season.number}</h1>
      <p>Year: {season.year}</p>

      <section>
        <h2>Episodes</h2>
        <Link href={`/tv-shows/${encodeURIComponent(decodedTitle)}/seasons/${seasonNumber}/episodes/create`}>
          Add Episode
        </Link>
        <EpisodeList episodes={episodes} tvShowTitle={decodedTitle} seasonNumber={seasonNumber} />
      </section>
    </main>
  );
}
