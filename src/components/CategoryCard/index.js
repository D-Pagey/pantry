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
        case 'All':
            return 'orange';
        default:
            return 'purple';
    }
};

const CategoryCard = ({ category, quantity }) => (
    <S.Link
        colour={getCategoryColour(category)}
        to={`/${category.toLowerCase()}`}
        data-testid="categoryCard"
    >
        <S.Title>{category}</S.Title>
        <S.Text>{quantity}</S.Text>
    </S.Link>
);

CategoryCard.propTypes = {
    category: string.isRequired,
    quantity: number.isRequired
};

export default CategoryCard;
