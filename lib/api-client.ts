import type { AssetType, AssetKey, Asset } from "@/types";
import type {
  SearchPayload,
  ReadAssetPayload,
  CreateAssetPayload,
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

export async function readAsset<T extends Asset>(key: AssetKey): Promise<T> {
  const payload: ReadAssetPayload = { key };
  return apiPost<ReadAssetPayload, T>(API_ENDPOINTS.READ_ASSET, payload);
}

export async function createAsset<T extends Asset>(
  asset: Omit<T, keyof import("@/types").AssetBase>,
): Promise<T[]> {
  const payload: CreateAssetPayload = {
    asset: [asset as Record<string, unknown> & { "@assetType": AssetType }],
  };

  return apiPost<CreateAssetPayload, T[]>(API_ENDPOINTS.CREATE_ASSET, payload);
}
