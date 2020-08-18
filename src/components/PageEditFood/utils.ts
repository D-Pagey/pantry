import { UserType, FoodType, FoodWithPhotoType } from '../../types';

export const swapIdForPhoto = (editingItem: FoodType, fridgeUsers: UserType[]): FoodWithPhotoType => {
    const updatedBatches = editingItem.batches.map(batch => {
        const photo = fridgeUsers.reduce((acc, curr) => {
            if (curr.uid === batch.ownerId) return curr.photo;

            return acc;
        }, '');

        return { expires: batch.expires, ownerPhoto: photo, servings: batch.servings };
    });

    return { ...editingItem, batches: updatedBatches };
};