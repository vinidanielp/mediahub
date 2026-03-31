'use client';

import { createSeasonAction } from '@/app/actions/seasons';

interface SeasonFormProps {
  tvShowTitle: string;
}

export function SeasonForm({ tvShowTitle }: SeasonFormProps) {
  return (
    <form action={createSeasonAction}>
      <input type="hidden" name="tvShowTitle" value={tvShowTitle} />

      <div>
        <label htmlFor="number">Season Number</label>
        <input id="number" name="number" type="number" min="1" required />
      </div>

      <div>
        <label htmlFor="year">Year</label>
        <input id="year" name="year" type="number" min="1900" required />
      </div>

      <button type="submit">Create Season</button>
    </form>
  );
}
