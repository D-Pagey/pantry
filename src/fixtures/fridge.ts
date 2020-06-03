import { FoodTypes } from '../types';

export const Fridge: FoodTypes[] = [
    {
        categories: ['111'],
        expires: new Date(2019, 9, 12),
        id: '1245',
        name: 'chicken',
        servings: 2,
        owner: 'Dan'
    },
    {
        categories: ['111'],
        expires: new Date(2019, 3, 9),
        id: '9999',
        name: 'steak',
        servings: 1,
        owner: 'Dan'
    },
    {
        categories: ['222'],
        expires: new Date(2019, 3, 9),
        id: '5678',
        name: 'salmon',
        servings: 1,
        owner: 'Dan'
    },
    {
        categories: ['111', '333'],
        expires: new Date(2019, 3, 9),
        id: '7777',
        name: 'broccolli',
        servings: 1,
        owner: 'Dan'
    }
];
