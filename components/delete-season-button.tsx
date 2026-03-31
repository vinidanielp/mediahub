'use client';

import { deleteSeasonAction } from '@/app/actions/seasons';

interface DeleteSeasonButtonProps {
  tvShowTitle: string;
  number: number;
}

export function DeleteSeasonButton({ tvShowTitle, number }: DeleteSeasonButtonProps) {
  return (
    <form action={deleteSeasonAction}>
      <input type="hidden" name="tvShowTitle" value={tvShowTitle} />
      <input type="hidden" name="number" value={number} />
      <button type="submit">Delete</button>
    </form>
  );
}
