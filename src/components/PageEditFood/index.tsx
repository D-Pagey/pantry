import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { FoodType, FoodWithPhotoType, UserType } from '../../types';
import { Layout } from '../Layout';
import { EditFoodServings } from '../EditFoodServings';
import { swapIdForPhoto } from './utils';
import * as S from './styles';

type PageEditFoodProps = {
    fridge?: FoodType[];
    fridgeUsers: UserType[];
    updateFridge: (food: FoodWithPhotoType) => void;
};

export const PageEditFood: FC<PageEditFoodProps> = ({ fridge, fridgeUsers, updateFridge }) => {
    const [item, setItem] = useState<FoodWithPhotoType>();
    const { name } = useParams();

    useEffect(() => {
        if (fridge) {
            const editingItem = fridge.filter((x) => x.name === name)[0];

            if (editingItem) {
                const itemWithPhotos = swapIdForPhoto(editingItem, fridgeUsers);
                setItem(itemWithPhotos);
            }
        }
    }, [fridge, fridgeUsers, name]);

    return (
        <Layout title="Edit servings">
            <S.Wrapper>{item && <EditFoodServings updateFridge={updateFridge} item={item} />}</S.Wrapper>
        </Layout>
    );
};
