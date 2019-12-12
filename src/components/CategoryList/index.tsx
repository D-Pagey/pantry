import React from 'react';
import CategoryCard from '../CategoryCard';
import { arrayOf, string, shape, number } from 'prop-types';
import * as S from './styles';

type CategoryListTypes = {
    categoryCounts: { category: string; count: number }[];
};

const CategoryList = ({ categoryCounts }: CategoryListTypes): JSX.Element => {
    return (
        <S.Wrapper>
            {categoryCounts.map((item: { category: string; count: number }) => (
                <CategoryCard category={item.category} quantity={item.count} key={item.category} />
            ))}
        </S.Wrapper>
    );
};

CategoryList.propTypes = {
    categoryCounts: arrayOf(shape({ category: string, count: number }))
};

export default CategoryList;
