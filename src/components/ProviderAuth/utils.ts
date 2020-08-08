import { DatabaseUserType, UserType } from '../../types';

export const formatUser = (databaseUser: DatabaseUserType): UserType => {
    const notificationsArray = Object.values(databaseUser.notifications).map((item) => ({
        ...item,
        createdAt: item.createdAt.toDate()
    }));

    return { ...databaseUser, notifications: notificationsArray };
};
