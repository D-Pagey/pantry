import React, { FC, useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import arraySort from 'array-sort';

import { convertBatchesArray } from '../../utils';
import { DatabaseFoodType, FoodType, TenantType } from '../../types';
import { db } from '../../services';
import { AuthContext } from '../ProviderAuth';
import { CreatableDropdown } from '../CreatableDropdown';
import { Layout } from '../Layout';
import { Button } from '../Button';
import { EditFoodServings } from '../EditFoodServings';
import * as S from './styles';

/**
 * This function adds a brand new item then deletes the old item out of firestore
 */
const replaceItem = async (newItem: DatabaseFoodType, nameToBeDeleted: string, household: string) => {
    // add new item
    await db
        .collection('households')
        .doc(household)
        .update({
            [`fridge.${newItem.name}`]: newItem
        });

    // delete old item
    await db
        .collection('households')
        .doc(household)
        .update({
            [`fridge.${nameToBeDeleted}.batches`]: {}
        });
};

const mergeItem = async (existingItem: FoodType, currentItem: FoodType, household: string) => {
    const mergedBatches = [...existingItem.batches, ...currentItem.batches];
    const updatedItem = { ...existingItem, batches: mergedBatches };
    const databaseFoodType = convertBatchesArray([updatedItem]);

    await db
        .collection('households')
        .doc(household)
        .update({
            [`fridge.${existingItem.name}`]: databaseFoodType[0]
        });

    await db
        .collection('households')
        .doc(household)
        .update({
            [`fridge.${currentItem.name}.batches`]: {}
        });
};

type PageEditFoodProps = {
    fridge: FoodType[];
    tenants: TenantType[];
};

export const PageEditFood: FC<PageEditFoodProps> = ({ fridge, tenants }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [item, setItem] = useState<FoodType>();
    const [newName, setNewName] = useState('');
    const { user } = useContext(AuthContext);
    const { name } = useParams<{ name: string }>();
    const history = useHistory();

    useEffect(() => {
        const editingItem = fridge.filter((food) => food.name === name)[0];

        if (editingItem && newName === '') {
            const sortedBatches = arraySort(editingItem.batches, 'expires');

            setItem({ ...editingItem, batches: sortedBatches });
            setNewName(editingItem.name);
        }
    }, [fridge, name, newName]);

    const handleEdit = async () => {
        setIsLoading(true);
        // converts batches back to object of objects
        if (item && user?.household) {
            const updatedItem = { ...item, name: newName };
            const existingItem = fridge.filter((item) => item.batches.length > 0 && item.name === newName);

            if (existingItem.length === 0) {
                const converted = convertBatchesArray([updatedItem]);
                await replaceItem(converted[0], item.name, user.household);
            } else {
                await mergeItem(existingItem[0], item, user.household);
            }
        }

        history.push('/food');
    };

    const getDropdownOptions = (): string[] => {
        if (fridge) {
            return fridge.map((item: FoodType) => item.name);
        }

        return [];
    };

    return (
        <Layout title={`Edit ${item ? item.name : ''}`} isLoading={isLoading}>
            <S.Wrapper>
                {item && (
                    <>
                        <p>Change the name of {item.name}:</p>

                        <CreatableDropdown
                            options={getDropdownOptions()}
                            setSelected={setNewName}
                            defaultValue={item.name}
                        />

                        <Button margin="0 0 2rem" onClick={handleEdit}>
                            Make Change
                        </Button>
                        <EditFoodServings item={item} tenants={tenants} />
                    </>
                )}
            </S.Wrapper>
        </Layout>
    );
};
