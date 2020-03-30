import React, { useContext } from 'react';
import { FirebaseContext } from '../ProviderFirebase';
import CategoryCard from '../CategoryCard';
import * as S from './styles';

type ItemType = {
    label: string;
    colour: string;
    count: number;
};

const CategoryList = (): JSX.Element => {
    const { categories } = useContext(FirebaseContext);

    return (
        <S.Wrapper data-testid="categoryList">
            {categories.map((item: ItemType) => (
                <CategoryCard label={item.label} colour={item.colour} quantity={item.count} key={item.label} />
            ))}
        </S.Wrapper>
    );
};

export default CategoryList;
