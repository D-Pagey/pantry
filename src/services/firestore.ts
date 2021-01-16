import { BatchType, DatabaseFoodType } from '../types';
import { db, firebase } from '.';

type UpdateBatchProps = {
    name: string;
    batch: BatchType;
    userHousehold: string;
};

export const updateBatch = ({ name, batch, userHousehold }: UpdateBatchProps): Promise<void> => {
    return db
        .collection('households')
        .doc(userHousehold)
        .update({
            [`fridge.${name}.batches.${batch.id}`]: batch
        });
};

type UpdateExistingPropertiesProps = {
    name: string;
    category: string;
    unit: string;
    userHousehold: string;
};

export const updateExistingProperties = ({
    name,
    category,
    unit,
    userHousehold
}: UpdateExistingPropertiesProps): Promise<void> => {
    return db
        .collection('households')
        .doc(userHousehold)
        .update({
            [`fridge.${name}`]: { name, category, unit }
        });
};

export const deleteItemBatches = (itemName: string, household: string): Promise<void> => {
    return db
        .collection('households')
        .doc(household)
        .update({
            [`fridge.${itemName}.batches`]: {}
        });
};

export const addItem = (newItem: DatabaseFoodType, household: string): Promise<void> => {
    return db
        .collection('households')
        .doc(household)
        .update({
            [`fridge.${newItem.name}`]: newItem
        });
};

export const updateItemField = (name: string, property: string, value: string, household: string): Promise<void> => {
    return db
        .collection('households')
        .doc(household)
        .update({
            [`fridge.${name}.${property}`]: value
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

export const deleteBatch = ({ name, batchId, userHousehold }: DeleteBatchProps): Promise<void> => {
    return db
        .collection('households')
        .doc(userHousehold)
        .update({
            [`fridge.${name}.batches.${batchId}`]: firebase.firestore.FieldValue.delete()
        });
};
