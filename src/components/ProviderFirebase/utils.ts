import { CategoryType, DatabaseCategoryType } from '../../types';

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