import React from 'react';
import { number, string } from 'prop-types';
import * as S from './styles';

const getCategoryColour = (category) => {
    switch (category) {
        case 'Meat':
            return 'red';
        case 'Vegetables':
            return 'green';
        case 'Fish':
            return 'blue';
        default:
            return 'purple';
    }
};

const CategoryCard = ({ category, quantity }) => (
    <S.Wrapper colour={getCategoryColour(category)} data-testid="categoryCard">
        <S.Title>{category}</S.Title>
        <S.Text>{quantity}</S.Text>
    </S.Wrapper>
);

CategoryCard.propTypes = {
    category: string.isRequired,
    quantity: number.isRequired
};

export default CategoryCard;
