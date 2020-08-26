import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import arraySort from 'array-sort';

import { FoodType } from '../../types';
import { Layout } from '../Layout';
import { EditFoodServings } from '../EditFoodServings';
import * as S from './styles';

type PageEditFoodProps = {
    fridge?: FoodType[];
};

export const PageEditFood: FC<PageEditFoodProps> = ({ fridge }) => {
    const [item, setItem] = useState<FoodType>();
    const { name } = useParams<{ name: string }>();

    useEffect(() => {
        if (fridge) {
            const editingItem = fridge.filter((food) => food.name === name)[0];

            if (editingItem) {
                const sortedBatches = arraySort(editingItem.batches, 'expires');

                setItem({ ...editingItem, batches: sortedBatches });
            }
        }
    }, [fridge, name]);

    return (
        <Layout title="Edit servings">
            <S.Wrapper>
                {item && <EditFoodServings item={item} />}
            </S.Wrapper>
        </Layout>
    );
};
