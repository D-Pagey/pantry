import { addDays } from 'date-fns';

import { BatchType, FoodType, NotificationType, UserType, TenantType, MetaDataType } from '../types';

export const TenantHeidi: TenantType = {
    email: 'heidi@gmail.com',
    houseRole: 'tenant',
    name: 'Heidi Seo',
    photo: 'https://lh3.googleusercontent.com/a-/AOh14Gi6ZcKd1ClkJqBEEP114ZJ07XWJfQLKJKL6apgFgQ',
    uid: 'zxwy'
};

export const TenantAlexa: TenantType = {
    email: 'alexa.com',
    houseRole: 'alexa',
    name: 'Alexa',
    photo:
        'https://firebasestorage.googleapis.com/v0/b/pantry-fcdad.appspot.com/o/alexa.jpg?alt=media&token=3a0702d7-a46c-49b9-b791-69d77ab66de3',
    uid: 'gfdd'
};

export const WelcomeNotification: NotificationType = {
    createdAt: new Date(),
    description: 'Welcome to Pantry',
    type: 'text',
    uid: 'xxwxwxwxwxw'
};

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

export const RejectedNotification: NotificationType = {
    createdAt: new Date(),
    description: 'Heidi declined your invite.',
    inviteData: {
        inviterHouseholdId: 'xxx',
        inviterUserId: 'abced'
    },
    type: 'invite',
    uid: 'xasxaxs'
};

export const UserDan: UserType = {
    email: 'dan@test.com',
    household: '123',
    name: 'Dan Page',
    photo: 'https://lh3.googleusercontent.com/a-/AOh14Gi6ZcKd1ClkJqBEEP114ZJ07XWJfQLKJKL6apgFgQ',
    notifications: [UnreadNotification],
    uid: 'abcde'
};

export const TenantDan: TenantType = {
    email: UserDan.email,
    houseRole: 'admin',
    name: UserDan.name,
    photo: UserDan.photo,
    uid: UserDan.uid
};

export const UserJoe: UserType = {
    email: 'joe@test.com',
    household: '456',
    name: 'Joe Hunt',
    photo:
        'https://lh5.googleusercontent.com/-2Kb4LT8qzLs/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnT8gAa__5KWDwf4PR1ro78WH3YRg/photo.jpg',
    notifications: [WelcomeNotification],
    uid: 'fghij'
};

export const TenantJoe: TenantType = {
    email: UserJoe.email,
    houseRole: 'pending',
    name: UserJoe.name,
    photo: UserJoe.photo,
    uid: UserJoe.uid
};

export const ExpiredBatch: BatchType = {
    id: '1111111',
    expires: new Date(),
    ownerId: TenantJoe.uid,
    quantity: 1
};

export const ExpiringSoonBatch: BatchType = {
    id: '22222222',
    expires: addDays(new Date(), 2),
    ownerId: TenantDan.uid,
    quantity: 2
};

export const FreshBatch: BatchType = {
    id: '3333333',
    expires: addDays(new Date(), 5),
    ownerId: TenantHeidi.uid,
    quantity: 4
};

export const Batches: BatchType[] = [ExpiredBatch, ExpiringSoonBatch, FreshBatch];

export const Fridge: FoodType[] = [
    {
        batches: Batches,
        category: 'vegetables',
        name: 'really long food name for carrot',
        unit: 'servings'
    },
    {
        batches: Batches,
        category: 'vegetables',
        name: 'broccoli',
        unit: 'servings'
    },
    {
        batches: Batches,
        category: 'meat',
        name: 'steak',
        unit: 'servings'
    },
    {
        batches: Batches,
        category: 'dairy',
        name: 'milk',
        unit: 'carton'
    },
    {
        batches: [],
        category: 'dairy',
        name: 'chocolate',
        unit: 'servings'
    }
];

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

export const MetaData: MetaDataType = {
    quantities: [1, 2, 3, 4, 5, 6],
    units: ['servings', 'units', 'kilograms', 'grams', 'jars']
};
