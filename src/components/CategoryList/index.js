import React, { useContext } from 'react';
import CategoryCard from '../CategoryCard';
import { FirebaseContext } from '../ProviderFirebase';
import * as S from './styles';

const CategoryList = () => {
    const { categories } = useContext(FirebaseContext);

    return (
        <S.Wrapper>
            {categories.map((item) => (
                <CategoryCard category={item.category} quantity={item.count} key={item.category} />
            ))}
        </S.Wrapper>
    );
};

export default CategoryList;
