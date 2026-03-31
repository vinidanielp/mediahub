import type { AssetType, AssetKey } from "./models";

export interface SearchPayload {
  query: {
    selector: {
      "@assetType": AssetType;
      [key: string]: unknown;
    };
  };
  limit?: number;
  bookmark?: string;
}

export interface ReadAssetPayload {
  key: AssetKey;
}

export interface CreateAssetPayload {
  asset: Array<Record<string, unknown> & { "@assetType": AssetType }>;
}

export interface UpdateAssetPayload {
  update: Record<string, unknown> & { "@assetType": AssetType };
}

export interface SearchResponse<T> {
  result: T[];
  metadata?: {
    bookmark: string;
    fetchedRecordsCount: number;
  };
}
