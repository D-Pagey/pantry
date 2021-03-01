import { DatabaseFoodType } from '../types';
import { db } from '.';

/**
 * This function deletes all batches for an item
 */
export const deleteItemBatches = (name: string, household: string): Promise<void> => {
    return db
        .collection('households')
        .doc(household)
        .update({
            [`fridge.${name}.batches`]: {}
        });
};

/**
 * This function adds a brand new item or overwrites an existing one
 */
export const addItem = (newItem: DatabaseFoodType, household: string): Promise<void> => {
    if (newItem.name.split('').includes('.')) {
        throw new Error('Item name should not contain a period');
    }

    return db
        .collection('households')
        .doc(household)
        .update({
            [`fridge.${newItem.name}`]: newItem
        });
};

/**
 * This function adds a brand new item or overwrites an existing one
 */
export const addNewUnit = (units: string[], household: string): Promise<void> => {
    return db
        .collection('households')
        .doc(household)
        .update({
            [`meta.units`]: units
        });
};

/**
 * This function adds a brand new item then deletes the old item out of firestore
 */
export const addItemDeleteItem = async (
    newItem: DatabaseFoodType,
    nameToBeDeleted: string,
    household: string
): Promise<void> => {
    // add new item
    await addItem(newItem, household);

    // delete old item
    return deleteItemBatches(nameToBeDeleted, household);
};
