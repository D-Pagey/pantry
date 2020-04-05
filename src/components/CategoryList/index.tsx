import React, { useContext } from 'react';
import { FirebaseContext } from '../ProviderFirebase';
import { CategoryCard } from '../CategoryCard';
import * as S from './styles';

type ItemType = {
    colour: string;
    count: number;
    label: string;
};

export const CategoryList = (): JSX.Element => {
    const { categories } = useContext(FirebaseContext);

    return (
        <S.Wrapper data-testid="categoryList">
            {categories.map((item: ItemType) => {
                if (item.count > 0) {
                    return <CategoryCard label={item.label} colour={item.colour} count={item.count} key={item.label} />;
                }

                return null;
            })}
        </S.Wrapper>
    );
};
