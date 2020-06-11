import { addDays } from 'date-fns';
import { CategoriesArray, CategoriesObject, CategoriesWithCounts } from './categories';
import { Fridge } from './fridge';

export { CategoriesArray, CategoriesObject, CategoriesWithCounts, Fridge };

export const Batches = [
    {
        expires: new Date(),
        owner: '123',
        servings: 1
    },
    {
        expires: addDays(new Date(), 2),
        owner: '123',
        servings: 2
    },
    {
        expires: addDays(new Date(), 5),
        owner: '123',
        servings: 2
    }
];
