// this is turning into real spaghetti
export type BatchType = {
    expires: Date | any;
    ownerId: string;
    servings: number;
};

type OwnerPhotoType = {
    ownerPhoto: string;
};

export type FoodCardBatchType = Omit<BatchType, 'ownerId'> & OwnerPhotoType;

export type FoodType = {
    batches: BatchType[];
    category: string;
    name: string;
};

type FoodCardBatches = {
    batches: FoodCardBatchType[];
};

export type FoodCardType = Omit<FoodType, 'batches'> & FoodCardBatches;

export type DropdownOptionType = {
    label: string;
    value: string;
};

export type UserType = {
    email: string;
    household: string;
    name: string;
    photo: string;
    notifications: NotificationType[];
    uid: string;
};

export type NotificationType = {
    createdAt: Date;
    description: string;
    inviteData?: {
        inviterUserId: string;
        inviterHouseholdId: string;
    };
    type: 'invite' | 'text';
    uid: string;
};

export type DatabaseNotificationType = {
    createdAt: any;
    description: string;
    inviteData?: {
        inviterUserId: string;
        inviterHouseholdId: string;
    };
    type: 'invite' | 'text';
    uid: string;
};