import { differenceInDays } from 'date-fns';
import { CategoryType, DatabaseCategoryWithCountsType } from '../types';
import { colours } from '../tokens';

export const chooseDateColour = (date: Date): string => {
  const difference = differenceInDays(date, new Date());

  if (difference < 1) return colours.red;
  if (difference <= 2) return colours.blue;

  return colours.black;
};

export const formatCategories = (categories: DatabaseCategoryWithCountsType[]): CategoryType[] => {
    return categories.reduce((acc, curr) => {
        if (curr.name === 'expiring') return acc;

        return [
            ...acc,
            {
                ...curr,
                label: curr.name,
                value: curr.name
            }
        ];
    }, [] as CategoryType[]);
};