export type BatchType = {
    expires: Date | any;
    ownerId: string;
    servings: number;
};

export type FoodType = {
    batches: BatchType[];
    category: string;
    name: string;
};

export type DropdownOptionType = {
    label: string;
    value: string;
};

export type UserType = {
    email: string;
    household: string;
    name: string;
    photo: string;
    uid: string;
};

export type NotificationType = {
    createdAt: Date;
    description: string;
    hasRead: boolean;
    inviterUid: string;
    type: 'invite';
    uid: string;
};
