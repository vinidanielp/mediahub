export interface AssetKey {
  '@assetType': string;
  '@key': string;
}

export interface AssetBase extends AssetKey {
  '@lastTouchBy': string;
  '@lastTx': string;
  '@lastUpdated': string;
}

export interface TvShow extends AssetBase {
  '@assetType': 'tvShows';
  title: string;
  description: string;
  recommendedAge: number;
}

export interface Season extends AssetBase {
  '@assetType': 'seasons';
  number: number;
  tvShow: AssetKey;
  year: number;
}

export interface Episode extends AssetBase {
  '@assetType': 'episodes';
  season: AssetKey;
  episodeNumber: number;
  title: string;
  releaseDate: string;
  description: string;
  rating?: number;
}

export interface Watchlist extends AssetBase {
  '@assetType': 'watchlist';
  title: string;
  tvShows?: AssetKey[];
  description?: string;
}

export type AssetType = 'tvShows' | 'seasons' | 'episodes' | 'watchlist';

export type Asset = TvShow | Season | Episode | Watchlist;
