import { CategoryType, DatabaseCategoryType, FoodTypes } from '../../types';

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

// export const updateCategoriesCount = (allCategoryIds: string[], categories: DatabaseCategoryType) => {
//   return fridge.reduce((acc, curr) => {
      
//   }, []);
  
  
//   // return fridge.map(food => {
//     //   categories.map(id => {
//     //     const fullCategory = categories.filter(category => category.id === id);

//     //     return {
//     //       ...fullCategory[0],

//     //     }
//     //   })
//     // });
// };
