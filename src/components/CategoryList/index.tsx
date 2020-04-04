import React, { useContext } from 'react';
import { FirebaseContext } from '../ProviderFirebase';
import { CategoryCard } from '../CategoryCard';
import * as S from './styles';

type ItemType = {
    label: string;
    colour: string;
    count: number;
};

export const CategoryList = (): JSX.Element => {
    const { categories } = useContext(FirebaseContext);

    return (
        <S.Wrapper data-testid="categoryList">
            {categories.map((item: ItemType) => {
                if (item.count > 0) {
                    return (
                        <CategoryCard label={item.label} colour={item.colour} quantity={item.count} key={item.label} />
                    );
                }

                return null;
            })}
        </S.Wrapper>
    );
};
