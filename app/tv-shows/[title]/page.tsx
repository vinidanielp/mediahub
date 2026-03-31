import Link from 'next/link';
import { readAsset, searchAssets } from '@/lib/api-client';
import { SeasonList } from '@/components/season-list';
import type { TvShow, Season } from '@/types';

interface TvShowDetailPageProps {
  params: Promise<{ title: string }>;
}

export default async function TvShowDetailPage({ params }: TvShowDetailPageProps) {
  const { title } = await params;
  const decodedTitle = decodeURIComponent(title);

  const tvShow = await readAsset<TvShow>({
    '@assetType': 'tvShows',
    title: decodedTitle,
  });

  const seasons = await searchAssets<Season>('seasons', {
    tvShow: { '@assetType': 'tvShows', title: decodedTitle },
  });

  return (
    <main>
      <Link href="/">← Back to Home</Link>
      <h1>{tvShow.title}</h1>
      <p>{tvShow.description}</p>
      <p>Recommended Age: {tvShow.recommendedAge}+</p>

      <section>
        <h2>Seasons</h2>
        <Link href={`/tv-shows/${encodeURIComponent(decodedTitle)}/seasons/create`}>
          Add Season
        </Link>
        <SeasonList seasons={seasons} tvShowTitle={decodedTitle} />
      </section>
    </main>
  );
}
