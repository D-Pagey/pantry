import React, { FC, useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { titleCase } from 'title-case';
import arraySort from 'array-sort';

import { convertBatchesArray, formatDropdownOptions } from '../../utils';
import { DatabaseFoodType, FoodType, TenantType, BatchType } from '../../types';
import { db } from '../../services';
import { AuthContext } from '../ProviderAuth';
import { Layout } from '../Layout';
import { EditFoodServings } from '../EditFoodServings';
import * as S from './styles';

const deleteItemBatches = (itemName: string, household: string) =>
    db
        .collection('households')
        .doc(household)
        .update({
            [`fridge.${itemName}.batches`]: {}
        });

const addItem = (newItem: DatabaseFoodType, household: string) =>
    db
        .collection('households')
        .doc(household)
        .update({
            [`fridge.${newItem.name}`]: newItem
        });

const updateItemField = (name: string, property: string, value: string, household: string) =>
    db
        .collection('households')
        .doc(household)
        .update({
            [`fridge.${name}.${property}`]: value
        });

/**
 * This function adds a brand new item then deletes the old item out of firestore
 */
const addItemDeleteItem = async (newItem: DatabaseFoodType, nameToBeDeleted: string, household: string) => {
    // add new item
    await addItem(newItem, household);

    // delete old item
    await deleteItemBatches(nameToBeDeleted, household);
};

type PageEditFoodProps = {
    fridge: FoodType[];
    tenants: TenantType[];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateBatch: ({ name, batch }: { name: string; batch: BatchType }) => void;
};

export const PageEditFood: FC<PageEditFoodProps> = ({ fridge, tenants, updateBatch }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [item, setItem] = useState<FoodType>();
    const [newName, setNewName] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const { user } = useContext(AuthContext);
    const { name } = useParams<{ name: string }>();
    const history = useHistory();

    const nonPendingTenants = tenants.filter((tenant) => tenant.houseRole !== 'pending');

    useEffect(() => {
        const editingItem = fridge.filter((food) => food.name === name)[0];

        if (editingItem) {
            const sortedBatches = arraySort(editingItem.batches, 'expires');

            setItem({ ...editingItem, batches: sortedBatches });
            setNewName(editingItem.name);
            setNewCategory(editingItem.category);
        }
    }, [fridge, name]);

    const handleEdit = async () => {
        setIsLoading(true);

        if (item && user?.household) {
            const hasNamedChanged = newName !== item.name;
            const hasCategoryChanged = newCategory !== item.category;
            // check if any items with live batches exists with changed name
            const existingItems = fridge.filter((item) => item.batches.length > 0 && item.name === newName);

            // if no newName or newCategory disable button
            if (!hasNamedChanged && !hasCategoryChanged) console.log('nothing changed');

            // if newName but no new category, specifically update name
            if (hasNamedChanged && !hasCategoryChanged) {
                if (existingItems.length > 0) {
                    // merge batches of current item and existing item
                    const mergedBatches = [...existingItems[0].batches, ...item.batches];
                    const mergedItem = { ...existingItems[0], batches: mergedBatches };

                    const converted = convertBatchesArray([mergedItem]);
                    await addItemDeleteItem(converted[0], item.name, user.household);
                } else {
                    // create a new database food type for current item with new name
                    const converted = convertBatchesArray([{ ...item, name: newName.toLowerCase() }]);
                    await addItemDeleteItem(converted[0], item.name, user.household);
                }
            }

            // if new category but no new name, specifically update category
            if (!hasNamedChanged && hasCategoryChanged) {
                await updateItemField(item.name, 'category', newCategory, user.household);
            }

            // if both updated, update both without deleting batches
            if (hasNamedChanged && hasCategoryChanged) {
                if (existingItems.length > 0) {
                    // merge batches of current item and existing item
                    const mergedBatches = [...existingItems[0].batches, ...item.batches];
                    const mergedItem = { batches: mergedBatches, category: newCategory, name: newName };

                    const converted = convertBatchesArray([mergedItem]);
                    await addItemDeleteItem(converted[0], item.name, user.household);
                } else {
                    // create a new database food type for current item with new name
                    const converted = convertBatchesArray([
                        { ...item, name: newName.toLowerCase(), category: newCategory.toLowerCase() }
                    ]);
                    await addItemDeleteItem(converted[0], item.name, user.household);
                }
            }
        }

        history.push('/food');
    };

    return (
        <Layout title={`Edit ${item ? item.name : ''}`} isLoading={isLoading} hideTitle>
            {item && (
                <>
                    <S.Title>
                        Edit your <S.Span>{titleCase(item.name)}</S.Span>:
                    </S.Title>

                    <S.Wrapper>
                        <S.Subtitle>Change item name:</S.Subtitle>
                        <S.CreatableDropdown
                            defaultValue={item.name}
                            options={formatDropdownOptions(fridge || [])}
                            setSelected={setNewName}
                        />

                        <S.Subtitle>Change category:</S.Subtitle>
                        <S.ChooseCategory handleClick={setNewCategory} selected={newCategory} hideTitle />

                        <S.Subtitle>Change date or owner:</S.Subtitle>
                        <EditFoodServings item={item} tenants={nonPendingTenants} updateBatch={updateBatch} />

                        <S.Button onClick={handleEdit}>Save Changes</S.Button>
                    </S.Wrapper>
                </>
            )}
        </Layout>
    );
};
