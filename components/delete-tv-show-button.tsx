'use client';

import { deleteTvShowAction } from '@/app/actions/tv-shows';

interface DeleteTvShowButtonProps {
  title: string;
}

export function DeleteTvShowButton({ title }: DeleteTvShowButtonProps) {
  return (
    <form action={deleteTvShowAction}>
      <input type="hidden" name="title" value={title} />
      <button type="submit">Delete</button>
    </form>
  );
}
