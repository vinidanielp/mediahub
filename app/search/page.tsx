import { Suspense } from "react";
import Link from "next/link";
import { searchAssets } from "@/lib/api-client";
import { SearchBar } from "@/components/search-bar";
import type { TvShow, Season, Episode } from "@/types";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim().toLowerCase() ?? "";

  let tvShows: TvShow[] = [];
  let seasons: Season[] = [];
  let episodes: Episode[] = [];

  if (query) {
    const [allTvShows, allSeasons, allEpisodes] = await Promise.all([
      searchAssets<TvShow>("tvShows"),
      searchAssets<Season>("seasons"),
      searchAssets<Episode>("episodes"),
    ]);

    tvShows = allTvShows.filter(
      (show) =>
        show.title.toLowerCase().includes(query) ||
        show.description.toLowerCase().includes(query),
    );

    seasons = allSeasons.filter(
      (season) =>
        String(season.number).includes(query) ||
        String(season.year).includes(query),
    );

    episodes = allEpisodes.filter(
      (ep) =>
        ep.title.toLowerCase().includes(query) ||
        ep.description.toLowerCase().includes(query),
    );
  }

  const hasResults =
    tvShows.length > 0 || seasons.length > 0 || episodes.length > 0;

  return (
    <main>
      <Link href="/">← Back to Home</Link>
      <h1>Search</h1>
      <Suspense fallback={null}>
        <SearchBar />
      </Suspense>

      {query && !hasResults && <p>No results found for &quot;{q}&quot;.</p>}

      {tvShows.length > 0 && (
        <section>
          <h2>TV Shows ({tvShows.length})</h2>
          <ul>
            {tvShows.map((show) => (
              <li key={show["@key"]}>
                <Link href={`/tv-shows/${encodeURIComponent(show.title)}`}>
                  <strong>{show.title}</strong>
                </Link>{" "}
                — {show.description} (Age: {show.recommendedAge}+)
              </li>
            ))}
          </ul>
        </section>
      )}

      {seasons.length > 0 && (
        <section>
          <h2>Seasons ({seasons.length})</h2>
          <ul>
            {seasons.map((season) => (
              <li key={season["@key"]}>
                <strong>Season {season.number}</strong> — Year: {season.year}
              </li>
            ))}
          </ul>
        </section>
      )}

      {episodes.length > 0 && (
        <section>
          <h2>Episodes ({episodes.length})</h2>
          <ul>
            {episodes.map((ep) => (
              <li key={ep["@key"]}>
                <strong>
                  Ep. {ep.episodeNumber} — {ep.title}
                </strong>{" "}
                — {ep.description}
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
