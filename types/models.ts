export interface AssetKey {
  "@assetType": string;
  "@key": string;
}

export type AssetRef =
  | AssetKey
  | (Record<string, unknown> & { "@assetType": string });

export interface AssetBase extends AssetKey {
  "@lastTouchBy": string;
  "@lastTx": string;
  "@lastUpdated": string;
}

export interface TvShow extends AssetBase {
  "@assetType": "tvShows";
  title: string;
  description: string;
  recommendedAge: number;
}

export interface Season extends AssetBase {
  "@assetType": "seasons";
  number: number;
  tvShow: AssetRef;
  year: number;
}

export interface Episode extends AssetBase {
  "@assetType": "episodes";
  season: AssetRef;
  episodeNumber: number;
  title: string;
  releaseDate: string;
  description: string;
  rating?: number;
}

export interface Watchlist extends AssetBase {
  "@assetType": "watchlist";
  title: string;
  tvShows?: AssetRef[];
  description?: string;
}

export type AssetType = "tvShows" | "seasons" | "episodes" | "watchlist";

export type Asset = TvShow | Season | Episode | Watchlist;
