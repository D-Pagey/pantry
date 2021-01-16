import { FoodType } from '../../types';

export const checkExistingCategory = (fridge: FoodType[], name: string): string => {
    return fridge.reduce((acc, curr) => {
        if (curr.name === name.toLowerCase()) {
            return curr.category;
        }

        return acc;
    }, '');
};
