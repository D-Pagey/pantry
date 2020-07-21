import { addDays } from 'date-fns';

import { BatchType, FoodType, UserType } from '../types';

export const ExpiredBatch: BatchType = {
    expires: new Date(),
    ownerId: '1',
    servings: 1
};

export const ExpiringSoonBatch: BatchType = {
    expires: addDays(new Date(), 2),
    ownerId: '2',
    servings: 2
};

export const FreshBatch: BatchType = {
    expires: addDays(new Date(), 5),
    ownerId: '3',
    servings: 4
};


export const Batches: BatchType[] = [
    ExpiredBatch,
    ExpiringSoonBatch,
    FreshBatch
];

export const Fridge: FoodType[] = [
    {
        batches: Batches,
        category: 'vegetables',
        name: 'carrot'
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

export const User: UserType = {
    email: 'dan@test.com',
    households: {
        default: '123'
    },
    name: 'Dan',
    photo: 'https://lh3.googleusercontent.com/a-/AOh14Gi6ZcKd1ClkJqBEEP114ZJ07XWJfQLKJKL6apgFgQ',
    uid: 'abcde'
};