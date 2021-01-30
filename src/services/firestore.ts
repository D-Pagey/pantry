import { BatchType, DatabaseFoodType } from '../types';
import { db, firebase } from '.';

type UpdateBatchProps = {
    name: string;
    batch: BatchType;
    userHousehold: string;
};

/**
 * This function updates a specific batch within an existing item
 */
export const updateBatch = ({ name, batch, userHousehold }: UpdateBatchProps): Promise<void> => {
    return db
        .collection('households')
        .doc(userHousehold)
        .update({
            [`fridge.${name}.batches.${batch.id}`]: batch
        });
};

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

type DeleteBatchProps = {
    name: string;
    batchId: string;
    userHousehold: string;
};

/**
 * This function deletes a specific batchId from firestore
 */
export const deleteBatch = ({ name, batchId, userHousehold }: DeleteBatchProps): Promise<void> => {
    return db
        .collection('households')
        .doc(userHousehold)
        .update({
            [`fridge.${name}.batches.${batchId}`]: firebase.firestore.FieldValue.delete()
        });
};
