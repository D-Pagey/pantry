import { DatabaseNotificationType, UserType } from '../../types';

type DatabaseUserType = {
    email: string;
    household: string;
    name: string;
    photo: string;
    notifications: {
        [id: string]: DatabaseNotificationType;
    };
    uid: string;
};

export const formatUser = (databaseUser: DatabaseUserType): UserType => {
    const notificationsArray = Object.values(databaseUser.notifications).map((item) => ({
        ...item,
        createdAt: item.createdAt.toDate()
    }));

    return { ...databaseUser, notifications: notificationsArray };
};
