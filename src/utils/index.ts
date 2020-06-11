import { differenceInDays } from 'date-fns';
import { colours } from '../tokens';

export const chooseDateColour = (date: Date): string => {
  const difference = differenceInDays(date, new Date());

  if (difference < 1) return colours.grey;
  if (difference <= 2) return colours.orange;

  return colours.darkGreen100;
};