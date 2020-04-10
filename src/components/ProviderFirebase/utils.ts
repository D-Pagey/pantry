import { CategoryType, DatabaseCategoryType } from '../../types';

export const indexOfLabel = (arrayOfLabels: string[], label: string): number => arrayOfLabels.reduce((acc, cur, index) => {
  if (cur === label) return index;
  return acc;
}, -1);

export const updateCategoriesObject = (categories: CategoryType[]): { [key: string]: DatabaseCategoryType } => {
  return categories.reduce((acc, curr) => {
    return {
      ...acc,
      [`categories.${curr.id}`]: {
        id: curr.id,
        name: curr.label,
        colour: curr.colour
      }
    };
  }, {});
};