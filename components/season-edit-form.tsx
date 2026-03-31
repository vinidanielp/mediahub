'use client';

import { updateSeasonAction } from '@/app/actions/seasons';
import type { Season } from '@/types';

interface SeasonEditFormProps {
  season: Season;
  tvShowTitle: string;
}

export function SeasonEditForm({ season, tvShowTitle }: SeasonEditFormProps) {
  return (
    <form action={updateSeasonAction}>
      <input type="hidden" name="tvShowTitle" value={tvShowTitle} />
      <input type="hidden" name="number" value={season.number} />

      <div>
        <label htmlFor="number">Season Number</label>
        <input id="number" type="number" defaultValue={season.number} disabled />
      </div>

      <div>
        <label htmlFor="year">Year</label>
        <input id="year" name="year" type="number" min="1900" defaultValue={season.year} required />
      </div>

      <button type="submit">Update Season</button>
    </form>
  );
}
