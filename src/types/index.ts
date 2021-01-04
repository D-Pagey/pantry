export type DropdownOptionType = {
    label: string;
    value: string;
};

export type HouseRoleType = 'admin' | 'alexa' | 'pending' | 'tenant';

export type TenantType = {
    email?: string;
    houseRole: HouseRoleType;
    name: string;
    photo: string;
    uid: string;
};

export type BatchType = {
    expires: Date | any;
    id: string;
    quantity: number;
    ownerId: string;
};

export type DatabaseFoodType = {
    batches: {
        [id: string]: BatchType;
    };
    category: string;
    name: string;
    unit: string;
};

export type FoodType = Omit<DatabaseFoodType, 'batches'> & { batches: BatchType[] };
export type NewFoodType = Omit<FoodType, 'batches'> & { batch: BatchType };

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

export type MetaDataType = {
    quantities: number[];
    units: string[];
};
