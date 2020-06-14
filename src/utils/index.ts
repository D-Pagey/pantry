import { differenceInDays } from 'date-fns';
import { colours, EXPIRING_SOON_DAYS } from '../tokens';

export const chooseDateColour = (date: Date): string => {
  const difference = differenceInDays(date, new Date());

  if (difference < 1) return colours.grey;
  if (difference < EXPIRING_SOON_DAYS) return colours.orange;

  return colours.darkGreen100;
};