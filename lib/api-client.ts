import type { AssetType, AssetKey, AssetBase, Asset } from "@/types";
import type {
  SearchPayload,
  ReadAssetPayload,
  CreateAssetPayload,
  UpdateAssetPayload,
  DeleteAssetPayload,
  SearchResponse,
} from "@/types";
import { API_ENDPOINTS } from "./api-endpoints";

const API_URL = process.env.GOLEDGER_API_URL;
const API_USERNAME = process.env.GOLEDGER_API_USERNAME;
const API_PASSWORD = process.env.GOLEDGER_API_PASSWORD;

function getAuthHeader(): string {
  if (!API_USERNAME || !API_PASSWORD) {
    throw new Error("Missing API credentials in environment variables");
  }
  return (
    "Basic " + Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString("base64")
  );
}

function getBaseUrl(): string {
  if (!API_URL) {
    throw new Error("Missing GOLEDGER_API_URL environment variable");
  }
  return API_URL;
}

async function apiPost<TBody, TResponse>(
  endpoint: string,
  body: TBody,
): Promise<TResponse> {
  const response = await fetch(`${getBaseUrl()}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthHeader(),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error ${response.status}: ${errorText}`);
  }

  return response.json() as Promise<TResponse>;
}

export async function searchAssets<T extends Asset>(
  assetType: AssetType,
): Promise<T[]> {
  const payload: SearchPayload = {
    query: {
      selector: {
        "@assetType": assetType,
      },
    },
  };

  const response = await apiPost<SearchPayload, SearchResponse<T>>(
    API_ENDPOINTS.SEARCH,
    payload,
  );

  return response.result;
}

export async function readAsset<T extends Asset>(
  key: ReadAssetPayload["key"],
): Promise<T> {
  const payload: ReadAssetPayload = { key };
  return apiPost<ReadAssetPayload, T>(API_ENDPOINTS.READ_ASSET, payload);
}

export async function createAsset<T extends Asset>(
  asset: Pick<T, "@assetType"> & Omit<T, keyof AssetBase>,
): Promise<T[]> {
  const payload: CreateAssetPayload = {
    asset: [asset as Record<string, unknown> & { "@assetType": AssetType }],
  };

  return apiPost<CreateAssetPayload, T[]>(API_ENDPOINTS.CREATE_ASSET, payload);
}

export async function updateAsset<T extends Asset>(
  asset: Pick<T, "@assetType"> & Partial<Omit<T, keyof AssetBase>>,
): Promise<T> {
  const payload: UpdateAssetPayload = {
    update: asset as Record<string, unknown> & { "@assetType": AssetType },
  };

  return apiPost<UpdateAssetPayload, T>(API_ENDPOINTS.UPDATE_ASSET, payload);
}

export async function deleteAsset(
  key: DeleteAssetPayload["key"],
): Promise<void> {
  const payload: DeleteAssetPayload = { key };
  await apiPost<DeleteAssetPayload, unknown>(
    API_ENDPOINTS.DELETE_ASSET,
    payload,
  );
}
