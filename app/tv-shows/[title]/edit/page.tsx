import { readAsset } from "@/lib/api-client";
import { TvShowEditForm } from "@/components/tv-show-edit-form";
import type { TvShow } from "@/types";

interface EditTvShowPageProps {
  params: Promise<{ title: string }>;
}

export default async function EditTvShowPage({ params }: EditTvShowPageProps) {
  const { title } = await params;
  const tvShow = await readAsset<TvShow>({
    "@assetType": "tvShows",
    title: decodeURIComponent(title),
  });

  return (
    <main>
      <h1>Edit TV Show</h1>
      <TvShowEditForm tvShow={tvShow} />
    </main>
  );
}
