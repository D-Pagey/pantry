import { addDays } from 'date-fns';

import { BatchType, FoodType, NotificationType, UserType, TenantType } from '../types';

export const Tenant: TenantType = {
    email: 'heidi@gmail.com',
    name: 'Heidi Seo',
    photo: 'https://lh3.googleusercontent.com/a-/AOh14Gi6ZcKd1ClkJqBEEP114ZJ07XWJfQLKJKL6apgFgQ',
    uid: 'zxwy'
};

export const ExpiredBatch: BatchType = {
    id: '1111111',
    expires: new Date(),
    owner: Tenant,
    servings: 1
};

export const ExpiringSoonBatch: BatchType = {
    id: '22222222',
    expires: addDays(new Date(), 2),
    owner: Tenant,
    servings: 2
};

export const FreshBatch: BatchType = {
    id: '3333333',
    expires: addDays(new Date(), 5),
    owner: Tenant,
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

export const WelcomeNotification: NotificationType = {
    createdAt: new Date(),
    description: 'Welcome to Pantry',
    type: 'text',
    uid: 'xxwxwxwxwxw'
};

export const UserDan: UserType = {
    email: 'dan@test.com',
    household: '123',
    name: 'Dan Page',
    photo: 'https://lh3.googleusercontent.com/a-/AOh14Gi6ZcKd1ClkJqBEEP114ZJ07XWJfQLKJKL6apgFgQ',
    notifications: [UnreadNotification],
    uid: 'abcde'
};

export const UserJoe: UserType = {
    email: 'joe@test.com',
    household: '456',
    name: 'Joe Hunt',
    photo: 'https://lh3.googleusercontent.com/a-/AOh14Gi6ZcKd1ClkJqBEEP114ZJ07XWJfQLKJKL6apgFgQ',
    notifications: [WelcomeNotification],
    uid: 'fghij'
};
