import Link from 'next/link';
import { SeasonForm } from '@/components/season-form';

interface CreateSeasonPageProps {
  params: Promise<{ title: string }>;
}

export default async function CreateSeasonPage({ params }: CreateSeasonPageProps) {
  const { title } = await params;
  const decodedTitle = decodeURIComponent(title);

  return (
    <main>
      <Link href={`/tv-shows/${encodeURIComponent(decodedTitle)}`}>← Back to {decodedTitle}</Link>
      <h1>Add Season to {decodedTitle}</h1>
      <SeasonForm tvShowTitle={decodedTitle} />
    </main>
  );
}
