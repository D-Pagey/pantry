import { DatabaseCategoryType, FoodTypes } from '../../types';

export const filterFridge = (fridge: FoodTypes[], category: DatabaseCategoryType): FoodTypes[] => {
    return fridge.filter((food) => {
        if (food.categories.includes(category.id)) {
            return true;
        }

        return false;
    });
};


// TODO: Refactor this to be one function
export const swapIdsForNames = (fridge: FoodTypes[], categories: DatabaseCategoryType[]): FoodTypes[] => {
    return fridge.map(foodItem => {
        const categoryNames = [...foodItem.categories.map(categoryId => {
            const fullCategory = categories.filter(item => item.id === categoryId);
            return fullCategory[0].name;
        })];
        
        return {
            ...foodItem,
            categories: categoryNames
        };
    });
};

export const swapNamesForIds = (fridge: FoodTypes[], categories: DatabaseCategoryType[]): FoodTypes[] => {
    return fridge.map(foodItem => {
        const categoryIds = [...foodItem.categories.map(categoryName => {
            const fullCategory = categories.filter(item => item.name === categoryName);
            return fullCategory[0].id;
        })];
        
        return {
            ...foodItem,
            categories: categoryIds
        };
    });
};