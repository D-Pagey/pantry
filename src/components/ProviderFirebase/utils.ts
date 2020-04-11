import { CategoryType, DatabaseCategoryType, FoodTypes, KeyedDatabaseCategoryType } from '../../types';

// converts an array of categories to an object of objects
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

// pulls all the categories in the fridge into one long array of string category ids
export const extractAllCategoryIds = (fridge: FoodTypes[]): string[] => {
  return fridge.map(food => {
    return food.categories.map(id => id);
  }).flat();
};

export const countCategories = (categoryIds: string[], categories: KeyedDatabaseCategoryType): KeyedDatabaseCategoryType => {
  return categoryIds.reduce((acc, curr) => {
    if (acc[curr] === undefined) {
      return {
        ...acc,
        [curr]: {
          ...categories[curr],
          count: 1
        }
      };
    }

    return {
      ...acc,
      [curr]: {
        ...acc[curr],
        count: acc[curr].count + 1
      }
    };
  }, {} as KeyedDatabaseCategoryType);
};