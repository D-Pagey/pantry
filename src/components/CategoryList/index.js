import React from 'react';
import { arrayOf, number, shape, string } from 'prop-types';
import CategoryCard from '../CategoryCard';
import * as S from './styles';

const CategoryList = ({ categories }) => (
    <S.Wrapper>
        {categories.map((item) => (
            <CategoryCard category={item.category} quantity={item.quantity} key={item.category} />
        ))}
    </S.Wrapper>
);

CategoryList.propTypes = {
    categories: arrayOf(
        shape({
            category: string.isRequired,
            quantity: number.isRequired
        }).isRequired
    ).isRequired
};

export default CategoryList;
