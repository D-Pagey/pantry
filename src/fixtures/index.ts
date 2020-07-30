import { addDays } from 'date-fns';

import { BatchType, FoodType, NotificationType, UserType, FoodCardBatchType, FoodCardType } from '../types';

export const UserPhoto1 = 'https://lh3.googleusercontent.com/a-/AOh14Gi6ZcKd1ClkJqBEEP114ZJ07XWJfQLKJKL6apgFgQ';
export const UserPhoto2 = 'http://lorempixel.com/400/400/sports/';
export const UserPhoto3 = 'http://place-puppy.com/200x200';

export const UnreadNotification: NotificationType = {
    createdAt: new Date(),
    description: 'Dan is inviting you to join their household',
    inviteData: {
        inviterHouseholdId: 'xxx',
        inviterUserId: 'abced'
    },
    type: 'invite',
    uid: 'aaa'
};

export const ReadNotification: NotificationType = {
    createdAt: addDays(new Date(), 2),
    description: 'Joe has invited you to join their household',
    inviteData: {
        inviterHouseholdId: 'xxx',
        inviterUserId: 'abced'
    },
    type: 'invite',
    uid: 'bbb'
};

export const User: UserType = {
    email: 'dan@test.com',
    household: '123',
    name: 'Dan',
    photo: UserPhoto1,
    notifications: [UnreadNotification],
    uid: 'abcde'
};

export const User2: UserType = {
    email: 'joe@test.com',
    household: '456',
    name: 'Joe',
    photo: UserPhoto2,
    notifications: [UnreadNotification],
    uid: 'fhhfsdsadd'
};

export const User3: UserType = {
    email: 'heidi@test.com',
    household: '789',
    name: 'Heidi',
    photo: UserPhoto3,
    notifications: [UnreadNotification],
    uid: 'xxxxxx'
};

export const ExpiredBatch: BatchType = {
    expires: new Date(),
    ownerId: User3.uid,
    servings: 1
};

export const ExpiredFoodCardBatch: FoodCardBatchType = {
    ...ExpiredBatch,
    ownerPhoto: UserPhoto1
};

export const ExpiringSoonBatch: BatchType = {
    expires: addDays(new Date(), 2),
    ownerId: User2.uid,
    servings: 2
};

export const ExpiringSoonFoodCardBatch: FoodCardBatchType = {
    ...ExpiringSoonBatch,
    ownerPhoto: UserPhoto2
};

export const FreshBatch: BatchType = {
    expires: addDays(new Date(), 5),
    ownerId: User.uid,
    servings: 4
};

export const FreshFoodCardBatch: FoodCardBatchType = {
    ...FreshBatch,
    ownerPhoto: UserPhoto3
};

export const Batches: BatchType[] = [ExpiredBatch, ExpiringSoonBatch, FreshBatch];

export const FoodCardBatches: FoodCardBatchType[] = [
    ExpiredFoodCardBatch,
    ExpiringSoonFoodCardBatch,
    FreshFoodCardBatch
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

export const FridgeWithPhotos: FoodCardType[] = [
    {
        batches: FoodCardBatches,
        category: 'vegetables',
        name: 'carrot'
    },
    {
        batches: FoodCardBatches,
        category: 'vegetables',
        name: 'broccoli'
    },
    {
        batches: FoodCardBatches,
        category: 'meat',
        name: 'steak'
    },
    {
        batches: FoodCardBatches,
        category: 'dairy',
        name: 'milk'
    }
];
