import { differenceInDays } from 'date-fns';

type foodTypes = {
  category: string;
  date: Date;
  expires: number;
  id: string;
  name: string;
}[];

export const getIndexOfId = (id: string, food: foodTypes): number => food.reduce((acc, curr, index) => {
  if (curr.id === id) return index;

  return acc;
}, -1);

export const chooseDateColour = (date: Date): string => {
  const difference = differenceInDays(date, new Date());

  if (difference < 1) return 'red';
  if (difference <= 2) return 'blue';

  return 'black';
};
