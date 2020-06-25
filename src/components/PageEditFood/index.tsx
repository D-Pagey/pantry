import React, { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { FoodType } from '../../types';
import { Layout } from '../Layout';
import { EditFoodServings } from '../EditFoodServings';
import * as S from './styles';

export const PageEditFood: FC = () => {
    const [item, setItem] = useState<FoodType>();
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setItem(location.state as FoodType);
        }
    }, [location.state]);

    return (
        <Layout title="Edit servings">
            <S.Wrapper>{item && <EditFoodServings item={item} />}</S.Wrapper>
        </Layout>
    );
};
