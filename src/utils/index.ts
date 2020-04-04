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

type categoriesTypes = {
  colour: string;
  count: number;
  id: string;
  label: string;
  value: string;
}[];

export const doesCategoryExist = (categories: categoriesTypes, category: string): boolean => {
  if (category === 'all') return true;

  return categories.reduce((acc, curr) => {
    if (curr.label.toLocaleLowerCase() === category.toLocaleLowerCase()) return true;

    return acc;
  }, false as boolean);
};
