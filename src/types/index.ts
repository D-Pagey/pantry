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

export type DatabaseUserType = {
    email: string;
    household: string;
    name: string;
    photo: string;
    notifications: {
        [id: string]: DatabaseNotificationType;
    };
    uid: string;
};

export type UserType = {
    email: string;
    household: string;
    name: string;
    photo: string;
    notifications: NotificationType[];
    houseRole?: string;
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