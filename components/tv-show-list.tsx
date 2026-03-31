import Link from "next/link";
import type { TvShow } from "@/types";

interface TvShowListProps {
  tvShows: TvShow[];
}

export function TvShowList({ tvShows }: TvShowListProps) {
  if (tvShows.length === 0) {
    return <p>No TV shows found.</p>;
  }

  return (
    <ul>
      {tvShows.map((show) => (
        <li key={show["@key"]}>
          <strong>{show.title}</strong> — {show.description} (Age:{" "}
          {show.recommendedAge}+){" "}
          <Link href={`/tv-shows/${encodeURIComponent(show.title)}/edit`}>
            Edit
          </Link>
        </li>
      ))}
    </ul>
  );
}
