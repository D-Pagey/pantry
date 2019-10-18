import React, { useContext } from 'react';
import CategoryCard from '../CategoryCard';
import { FirebaseContext } from '../ProviderFirebase';
import * as S from './styles';

const CategoryList = () => {
    const { categoryCounts } = useContext(FirebaseContext);

    return (
        <S.Wrapper>
            {categoryCounts.map((item: { category: string, count: number }) => (
                <CategoryCard category={item.category} quantity={item.count} key={item.category} />
            ))}
        </S.Wrapper>
    );
};

export default CategoryList;
