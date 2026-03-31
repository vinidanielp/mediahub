import { Suspense } from "react";
import Link from "next/link";
import { searchAssets } from "@/lib/api-client";
import { TvShowList } from "@/components/tv-show-list";
import { SearchBar } from "@/components/search-bar";
import type { TvShow } from "@/types";

export default async function Home() {
  const tvShows = await searchAssets<TvShow>("tvShows");

  return (
    <main>
      <h1>MediaHub</h1>
      <Suspense fallback={null}>
        <SearchBar />
      </Suspense>
      <section>
        <h2>TV Shows</h2>
        <Link href="/tv-shows/create">Add TV Show</Link>
        <TvShowList tvShows={tvShows} />
      </section>

      <section>
        <h2>Watchlists</h2>
        <Link href="/watchlists">View Watchlists</Link>
      </section>
    </main>
  );
}
