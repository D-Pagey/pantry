import React, { useContext } from 'react';
import CategoryCard from '../CategoryCard';
import { FirestoreContext } from '../ProviderFirestore';
import * as S from './styles';

const CategoryList = (): JSX.Element => {
    const { categoryCounts } = useContext(FirestoreContext);

    return (
        <S.Wrapper>
            {categoryCounts.map((item: { category: string; count: number }) => (
                <CategoryCard category={item.category} quantity={item.count} key={item.category} />
            ))}
        </S.Wrapper>
    );
};

export default CategoryList;
