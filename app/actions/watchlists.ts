'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createAsset, updateAsset, deleteAsset } from '@/lib/api-client';
import type { Watchlist } from '@/types';

export async function createWatchlistAction(formData: FormData) {
  const title = formData.get('title') as string;
  const description = (formData.get('description') as string) || undefined;

  if (!title) {
    throw new Error('Title is required');
  }

  await createAsset<Watchlist>({
    '@assetType': 'watchlist',
    title,
    ...(description && { description }),
  });

  revalidatePath('/watchlists');
  redirect('/watchlists');
}

export async function updateWatchlistAction(formData: FormData) {
  const title = formData.get('title') as string;
  const description = (formData.get('description') as string) || undefined;

  if (!title) {
    throw new Error('Title is required');
  }

  await updateAsset<Watchlist>({
    '@assetType': 'watchlist',
    title,
    ...(description !== undefined && { description }),
  });

  revalidatePath('/watchlists');
  redirect('/watchlists');
}

export async function deleteWatchlistAction(formData: FormData) {
  const title = formData.get('title') as string;

  if (!title) {
    throw new Error('Title is required');
  }

  await deleteAsset({
    '@assetType': 'watchlist',
    title,
  });

  revalidatePath('/watchlists');
}

export async function addTvShowToWatchlistAction(formData: FormData) {
  const watchlistTitle = formData.get('watchlistTitle') as string;
  const tvShowTitle = formData.get('tvShowTitle') as string;

  if (!watchlistTitle || !tvShowTitle) {
    throw new Error('Watchlist and TV Show are required');
  }

  await updateAsset<Watchlist>({
    '@assetType': 'watchlist',
    title: watchlistTitle,
    tvShows: [{ '@assetType': 'tvShows', title: tvShowTitle }],
  });

  revalidatePath(`/watchlists/${encodeURIComponent(watchlistTitle)}`);
}
