import { differenceInDays } from 'date-fns';
import { CategoryType, DatabaseCategoryWithCountsType } from '../types';

type FoodTypes = {
  category: string;
  date: Date;
  expires: number;
  id: string;
  name: string;
}[];

export const getIndexOfId = (id: string, food: FoodTypes): number => food.reduce((acc, curr, index) => {
  if (curr.id === id) return index;

  return acc;
}, -1);

export const chooseDateColour = (date: Date): string => {
  const difference = differenceInDays(date, new Date());

  if (difference < 1) return 'red';
  if (difference <= 2) return 'blue';

  return 'black';
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

/**
 * Take the category ids and exchanges for form values
 */
export const swapCategoryIdsForValues = (categoryIds: string[], categories: DatabaseCategoryWithCountsType[]): CategoryType[] => {
    const formattedCategories = formatCategories(categories);

    return categoryIds.reduce((acc, curr): CategoryType[] => {
        const category = formattedCategories.find((formatted) => formatted.id === curr);

        if (category) {
            return [...acc, category];
        }

        return acc;
    }, [] as CategoryType[]);
};