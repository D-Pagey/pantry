import React, { useContext } from 'react';
import { FirebaseContext } from '../ProviderFirebase';
import { CategoryCard } from '../CategoryCard';
import * as S from './styles';

type ItemType = {
    name: string;
    colour: string;
    count: number;
};

export const CategoryList = (): JSX.Element => {
    const { categories } = useContext(FirebaseContext);

    return (
        <S.Wrapper data-testid="categoryList">
            {categories.map((item: ItemType) => (
                <CategoryCard label={item.name} colour={item.colour} quantity={item.count} key={item.name} />
            ))}
        </S.Wrapper>
    );
};
