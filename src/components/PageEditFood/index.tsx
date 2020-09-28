import React, { FC, useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import arraySort from 'array-sort';

import { convertBatchesArray } from '../../utils';
import { DatabaseFoodType, FoodType, TenantType } from '../../types';
import { db, firebase } from '../../services';
import { AuthContext } from '../ProviderAuth';
import { Layout } from '../Layout';
import { Input } from '../Input';
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
            [`fridge.${nameToBeDeleted}`]: firebase.firestore.FieldValue.delete()
        });
};

type PageEditFoodProps = {
    fridge: FoodType[];
    tenants: TenantType[];
};

export const PageEditFood: FC<PageEditFoodProps> = ({ fridge, tenants }) => {
    const [item, setItem] = useState<FoodType>();
    const [newName, setNewName] = useState('');
    const { user } = useContext(AuthContext);
    const { name } = useParams<{ name: string }>();
    const history = useHistory();

    useEffect(() => {
        const editingItem = fridge.filter((food) => food.name === name)[0];

        if (editingItem) {
            const sortedBatches = arraySort(editingItem.batches, 'expires');

            setItem({ ...editingItem, batches: sortedBatches });
            setNewName(editingItem.name);
        }
    }, [fridge, name]);

    const handleNameChange = (e: any): void => setNewName(e.target.value);

    // TODO: Add check for if newName already exists, if so then call mergeItem instead of replaceItem
    const handleEdit = async () => {
        // converts batches back to object of objects
        if (item && user?.household) {
            const updatedItem = { ...item, name: newName };
            const converted = convertBatchesArray([updatedItem]);
            await replaceItem(converted[0], item.name, user.household);
        }

        history.push('/food');
    };

    return (
        <Layout title="Edit servings">
            <S.Wrapper>
                {item && (
                    <>
                        <p>Change the name of {item.name}:</p>
                        <Input margin="0 0 2rem" onChange={handleNameChange} placeholder={item.name} value={newName} />
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
