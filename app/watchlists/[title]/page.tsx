import Link from "next/link";
import { readAsset, searchAssets } from "@/lib/api-client";
import { AddTvShowToWatchlist } from "@/components/add-tv-show-to-watchlist";
import type { Watchlist, TvShow } from "@/types";

interface WatchlistDetailPageProps {
  params: Promise<{ title: string }>;
}

export default async function WatchlistDetailPage({
  params,
}: WatchlistDetailPageProps) {
  const { title } = await params;
  const decodedTitle = decodeURIComponent(title);

  const watchlist = await readAsset<Watchlist>({
    "@assetType": "watchlist",
    title: decodedTitle,
  });

  const allTvShows = await searchAssets<TvShow>("tvShows");

  return (
    <main>
      <Link href="/watchlists">← Back to Watchlists</Link>
      <h1>{watchlist.title}</h1>
      {watchlist.description && <p>{watchlist.description}</p>}

      <section>
        <h2>TV Shows in this Watchlist</h2>
        {watchlist.tvShows && watchlist.tvShows.length > 0 ? (
          <ul>
            {watchlist.tvShows.map((ref, index) => {
              const label =
                "@key" in ref ? String(ref["@key"]) : JSON.stringify(ref);
              return <li key={label + index}>{label}</li>;
            })}
          </ul>
        ) : (
          <p>No TV shows added yet.</p>
        )}
      </section>

      <section>
        <h2>Add TV Show</h2>
        <AddTvShowToWatchlist
          watchlistTitle={decodedTitle}
          tvShows={allTvShows}
        />
      </section>
    </main>
  );
}
