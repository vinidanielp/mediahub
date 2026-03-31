import Link from "next/link";
import { DeleteTvShowButton } from "./delete-tv-show-button";
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
          <Link href={`/tv-shows/${encodeURIComponent(show.title)}`}>
            <strong>{show.title}</strong>
          </Link>{" "}
          — {show.description} (Age: {show.recommendedAge}+){" "}
          <Link href={`/tv-shows/${encodeURIComponent(show.title)}/edit`}>
            Edit
          </Link>{" "}
          <DeleteTvShowButton title={show.title} />
        </li>
      ))}
    </ul>
  );
}
