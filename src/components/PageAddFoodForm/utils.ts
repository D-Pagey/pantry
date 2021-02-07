import { FoodType } from '../../types';

export const checkExistingCategory = (fridge: FoodType[], name: string): string => {
    return fridge.reduce((acc, curr) => {
        if (curr.name === name.toLowerCase()) {
            return curr.category;
        }

        return acc;
    }, '');
};

export const checkExistingItem = (fridge: FoodType[], name: string): FoodType | undefined => {
    return fridge.reduce((acc, curr): FoodType | undefined => {
        if (curr.name === name) return curr;

        return acc;
    }, undefined as FoodType | undefined);
};
