import { addDays } from 'date-fns';
import { BatchType, FoodType } from '../types';

export const ExpiringBatch: BatchType = {
    expires: new Date(),
    owner: '123',
    servings: 1
};

export const Batches: BatchType[] = [
    ExpiringBatch,
    {
        expires: addDays(new Date(), 2),
        owner: '123',
        servings: 2
    },
    {
        expires: addDays(new Date(), 5),
        owner: '123',
        servings: 3
    }
];

export const Fridge: FoodType[] = [
    {
        batches: Batches,
        category: 'vegetables',
        name: 'carrots'
    },
    {
        batches: Batches,
        category: 'vegetables',
        name: 'broccoli'
    },
    {
        batches: Batches,
        category: 'meat',
        name: 'steak'
    },
    {
        batches: Batches,
        category: 'dairy',
        name: 'milk'
    }
];
