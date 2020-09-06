import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import arraySort from 'array-sort';

import { FoodType, TenantType } from '../../types';
import { Layout } from '../Layout';
import { EditFoodServings } from '../EditFoodServings';
import * as S from './styles';

type PageEditFoodProps = {
    fridge: FoodType[];
    tenants: TenantType[];
};

export const PageEditFood: FC<PageEditFoodProps> = ({ fridge, tenants }) => {
    const [item, setItem] = useState<FoodType>();
    const { name } = useParams<{ name: string }>();

    useEffect(() => {
        const editingItem = fridge.filter((food) => food.name === name)[0];

        if (editingItem) {
            const sortedBatches = arraySort(editingItem.batches, 'expires');

            setItem({ ...editingItem, batches: sortedBatches });
        }
    }, [fridge, name]);

    return (
        <Layout title="Edit servings">
            <S.Wrapper>{item && <EditFoodServings item={item} tenants={tenants} />}</S.Wrapper>
        </Layout>
    );
};
