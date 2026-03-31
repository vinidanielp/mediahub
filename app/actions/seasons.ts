'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createAsset, updateAsset, deleteAsset } from '@/lib/api-client';
import type { Season } from '@/types';

export async function createSeasonAction(formData: FormData) {
  const tvShowTitle = formData.get('tvShowTitle') as string;
  const number = Number(formData.get('number'));
  const year = Number(formData.get('year'));

  if (!tvShowTitle || isNaN(number) || isNaN(year)) {
    throw new Error('All fields are required');
  }

  await createAsset<Season>({
    '@assetType': 'seasons',
    number,
    tvShow: {
      '@assetType': 'tvShows',
      title: tvShowTitle,
    },
    year,
  });

  revalidatePath(`/tv-shows/${encodeURIComponent(tvShowTitle)}`);
  redirect(`/tv-shows/${encodeURIComponent(tvShowTitle)}`);
}

export async function updateSeasonAction(formData: FormData) {
  const tvShowTitle = formData.get('tvShowTitle') as string;
  const number = Number(formData.get('number'));
  const year = Number(formData.get('year'));

  if (!tvShowTitle || isNaN(number) || isNaN(year)) {
    throw new Error('All fields are required');
  }

  await updateAsset<Season>({
    '@assetType': 'seasons',
    number,
    tvShow: {
      '@assetType': 'tvShows',
      title: tvShowTitle,
    },
    year,
  });

  revalidatePath(`/tv-shows/${encodeURIComponent(tvShowTitle)}`);
  redirect(`/tv-shows/${encodeURIComponent(tvShowTitle)}`);
}

export async function deleteSeasonAction(formData: FormData) {
  const tvShowTitle = formData.get('tvShowTitle') as string;
  const number = Number(formData.get('number'));

  if (!tvShowTitle || isNaN(number)) {
    throw new Error('TV Show and season number are required');
  }

  await deleteAsset({
    '@assetType': 'seasons',
    number,
    tvShow: {
      '@assetType': 'tvShows',
      title: tvShowTitle,
    },
  });

  revalidatePath(`/tv-shows/${encodeURIComponent(tvShowTitle)}`);
}
