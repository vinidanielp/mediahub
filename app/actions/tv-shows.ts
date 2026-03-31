"use server";

import { revalidatePath } from "next/cache";
import { createAsset, updateAsset } from "@/lib/api-client";
import type { TvShow } from "@/types";

export async function createTvShowAction(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const recommendedAge = Number(formData.get("recommendedAge"));

  if (!title || !description || isNaN(recommendedAge)) {
    throw new Error("All fields are required");
  }

  await createAsset<TvShow>({
    "@assetType": "tvShows",
    title,
    description,
    recommendedAge,
  });

  revalidatePath("/");
}

export async function updateTvShowAction(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const recommendedAge = Number(formData.get("recommendedAge"));

  if (!title || !description || isNaN(recommendedAge)) {
    throw new Error("All fields are required");
  }

  await updateAsset<TvShow>({
    "@assetType": "tvShows",
    title,
    description,
    recommendedAge,
  });

  revalidatePath("/");
}
