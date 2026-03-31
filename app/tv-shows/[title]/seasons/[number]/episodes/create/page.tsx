import Link from 'next/link';
import { EpisodeForm } from '@/components/episode-form';

interface CreateEpisodePageProps {
  params: Promise<{ title: string; number: string }>;
}

export default async function CreateEpisodePage({ params }: CreateEpisodePageProps) {
  const { title, number } = await params;
  const decodedTitle = decodeURIComponent(title);
  const seasonNumber = Number(number);

  return (
    <main>
      <Link href={`/tv-shows/${encodeURIComponent(decodedTitle)}/seasons/${seasonNumber}`}>
        ← Back to Season {seasonNumber}
      </Link>
      <h1>Add Episode to {decodedTitle} — Season {seasonNumber}</h1>
      <EpisodeForm tvShowTitle={decodedTitle} seasonNumber={seasonNumber} />
    </main>
  );
}
