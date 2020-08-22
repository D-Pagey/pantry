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

export interface DatabaseNotificationType {
    createdAt: any;
    description: string;
    inviteData?: {
        inviterUserId: string;
        inviterHouseholdId: string;
    };
    type: 'invite' | 'text';
    uid: string;
}

export type NotificationType = Omit<DatabaseNotificationType, 'createdAt'> & { createdAt: Date };

export interface DatabaseUserType {
    email: string;
    household: string;
    name: string;
    photo: string;
    notifications: {
        [id: string]: DatabaseNotificationType;
    };
    uid: string;
}

export type UserType = Omit<DatabaseUserType, 'notifications'> & { notifications: NotificationType[] };

export type TenantType = {
    email: string;
    name: string;
    houseRole?: string;
    photo: string;
    uid: string;
};
