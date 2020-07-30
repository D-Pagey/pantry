import { FoodCardType, FoodType, UserType } from '../../types';

export const getUserPhotoFromId = (users: UserType[], userId: string): string => {
    return users.reduce((acc, curr) => {
        if (curr.uid === userId) return curr.photo;
        
        return acc;
    }, '');
};

export const swapUserIdsForPhotos = (databaseFridge: FoodType[], users: UserType[]): FoodCardType[]  => {
    return databaseFridge.map(foodItem => {
        const swapped = foodItem.batches.map(batch => {
            const { expires, servings, ...rest } = batch;
            const ownerPhoto = getUserPhotoFromId(users, batch.ownerId);

            return {
                expires,
                servings,
                ownerPhoto
            };
        });

        return {
            ...foodItem,
            batches: swapped
        };
    });
};