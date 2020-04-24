import { CategoryCountType, CategoryType, DatabaseCategoryType, FoodTypes, KeyedDatabaseCategoryType } from '../../types';

// converts an array of categories to an object of objects
export const updateCategoriesObject = (categories: CategoryType[]): { [key: string]: DatabaseCategoryType } => {
    return categories.reduce((acc, curr) => {
        const { label, value, count, ...restOfCategory } = curr;

        return {
            ...acc,
            [`categories.${curr.id}`]: restOfCategory
        };
    }, {});
};

// pulls all the categories in the fridge into an object of id : count
export const countCategoryIds = (fridge: FoodTypes[]): CategoryCountType => {
    const flattenIds = fridge
        .map((food) => {
            return food.categories.map((id) => id);
        })
        .flat();

    return flattenIds.reduce((acc, curr) => {
        if (acc[curr] === undefined) {
            return {
                ...acc,
                [curr]: 1
            };
        }

        return {
            ...acc,
            [curr]: acc[curr] + 1
        };
    }, {} as CategoryCountType);
};

// correctly counts up all the categories
export const countCategories = (
    fridge: FoodTypes[],
    categories: KeyedDatabaseCategoryType
): Partial<CategoryType>[] => {
    const categoriesWithCounts = countCategoryIds(fridge);
    const initialCounts = Object.values(categories).map((x) => ({ ...x, count: 0 }));

    return initialCounts.map(category => {
      return {
        ...category,
        count: categoriesWithCounts[category.id] || 0
      };
    });
};
