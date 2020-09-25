import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import arraySort from 'array-sort';

import { FoodType, TenantType } from '../../types';
import { Layout } from '../Layout';
import { Input } from '../Input';
import { Button } from '../Button';
import { EditFoodServings } from '../EditFoodServings';
import * as S from './styles';

type PageEditFoodProps = {
    fridge: FoodType[];
    replaceItem: () => void;
    tenants: TenantType[];
};

export const PageEditFood: FC<PageEditFoodProps> = ({ fridge, replaceItem, tenants }) => {
    const [item, setItem] = useState<FoodType>();
    const [newName, setNewName] = useState('');
    const { name } = useParams<{ name: string }>();

    useEffect(() => {
        const editingItem = fridge.filter((food) => food.name === name)[0];

        if (editingItem) {
            const sortedBatches = arraySort(editingItem.batches, 'expires');

            setItem({ ...editingItem, batches: sortedBatches });
            setNewName(editingItem.name);
        }
    }, [fridge, name]);

    const handleNameChange = (e: any) => setNewName(e.target.value);

    const handleEdit = () => {
        // converts batches back to object of objects
        replaceItem();
        console.log('handling edit');
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
