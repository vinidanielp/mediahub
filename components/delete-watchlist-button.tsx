'use client';

import { deleteWatchlistAction } from '@/app/actions/watchlists';

interface DeleteWatchlistButtonProps {
  title: string;
}

export function DeleteWatchlistButton({ title }: DeleteWatchlistButtonProps) {
  return (
    <form action={deleteWatchlistAction}>
      <input type="hidden" name="title" value={title} />
      <button type="submit">Delete</button>
    </form>
  );
}
