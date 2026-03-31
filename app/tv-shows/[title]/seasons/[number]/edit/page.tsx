import Link from 'next/link';
import { readAsset } from '@/lib/api-client';
import { SeasonEditForm } from '@/components/season-edit-form';
import type { Season } from '@/types';

interface EditSeasonPageProps {
  params: Promise<{ title: string; number: string }>;
}

export default async function EditSeasonPage({ params }: EditSeasonPageProps) {
  const { title, number } = await params;
  const decodedTitle = decodeURIComponent(title);

  const season = await readAsset<Season>({
    '@assetType': 'seasons',
    number: Number(number),
    tvShow: { '@assetType': 'tvShows', title: decodedTitle },
  });

  return (
    <main>
      <Link href={`/tv-shows/${encodeURIComponent(decodedTitle)}`}>← Back to {decodedTitle}</Link>
      <h1>Edit Season {number}</h1>
      <SeasonEditForm season={season} tvShowTitle={decodedTitle} />
    </main>
  );
}
