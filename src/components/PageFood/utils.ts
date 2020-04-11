import { DatabaseCategoryType, FoodTypes } from '../../types';

export const filterFridge = (fridge: FoodTypes[], category: DatabaseCategoryType): FoodTypes[] => {
    return fridge.filter((food) => {
        if (food.categories.includes(category.id)) {
            return true;
        }

        return false;
    });
};
