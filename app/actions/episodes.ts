'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createAsset, updateAsset, deleteAsset } from '@/lib/api-client';
import type { Episode } from '@/types';

function buildSeasonRef(tvShowTitle: string, seasonNumber: number) {
  return {
    '@assetType': 'seasons' as const,
    number: seasonNumber,
    tvShow: { '@assetType': 'tvShows' as const, title: tvShowTitle },
  };
}

function buildRedirectPath(tvShowTitle: string, seasonNumber: number) {
  return `/tv-shows/${encodeURIComponent(tvShowTitle)}/seasons/${seasonNumber}`;
}

export async function createEpisodeAction(formData: FormData) {
  const tvShowTitle = formData.get('tvShowTitle') as string;
  const seasonNumber = Number(formData.get('seasonNumber'));
  const episodeNumber = Number(formData.get('episodeNumber'));
  const title = formData.get('title') as string;
  const releaseDate = formData.get('releaseDate') as string;
  const description = formData.get('description') as string;
  const rating = formData.get('rating') ? Number(formData.get('rating')) : undefined;

  if (!tvShowTitle || isNaN(seasonNumber) || isNaN(episodeNumber) || !title || !releaseDate || !description) {
    throw new Error('All required fields must be filled');
  }

  await createAsset<Episode>({
    '@assetType': 'episodes',
    season: buildSeasonRef(tvShowTitle, seasonNumber),
    episodeNumber,
    title,
    releaseDate,
    description,
    ...(rating !== undefined && { rating }),
  });

  const path = buildRedirectPath(tvShowTitle, seasonNumber);
  revalidatePath(path);
  redirect(path);
}

export async function updateEpisodeAction(formData: FormData) {
  const tvShowTitle = formData.get('tvShowTitle') as string;
  const seasonNumber = Number(formData.get('seasonNumber'));
  const episodeNumber = Number(formData.get('episodeNumber'));
  const title = formData.get('title') as string;
  const releaseDate = formData.get('releaseDate') as string;
  const description = formData.get('description') as string;
  const rating = formData.get('rating') ? Number(formData.get('rating')) : undefined;

  if (!tvShowTitle || isNaN(seasonNumber) || isNaN(episodeNumber) || !title || !releaseDate || !description) {
    throw new Error('All required fields must be filled');
  }

  await updateAsset<Episode>({
    '@assetType': 'episodes',
    season: buildSeasonRef(tvShowTitle, seasonNumber),
    episodeNumber,
    title,
    releaseDate,
    description,
    ...(rating !== undefined && { rating }),
  });

  const path = buildRedirectPath(tvShowTitle, seasonNumber);
  revalidatePath(path);
  redirect(path);
}

export async function deleteEpisodeAction(formData: FormData) {
  const tvShowTitle = formData.get('tvShowTitle') as string;
  const seasonNumber = Number(formData.get('seasonNumber'));
  const episodeNumber = Number(formData.get('episodeNumber'));

  if (!tvShowTitle || isNaN(seasonNumber) || isNaN(episodeNumber)) {
    throw new Error('TV Show, season and episode number are required');
  }

  await deleteAsset({
    '@assetType': 'episodes',
    season: buildSeasonRef(tvShowTitle, seasonNumber),
    episodeNumber,
  });

  revalidatePath(buildRedirectPath(tvShowTitle, seasonNumber));
}
