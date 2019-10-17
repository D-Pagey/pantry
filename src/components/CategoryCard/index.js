import React from 'react';
import { number, string } from 'prop-types';
import { titleCase } from 'change-case';
import * as S from './styles';

const getCategoryColour = (category) => {
    switch (category) {
        case 'meat':
            return 'red';
        case 'vegetables':
            return 'green';
        case 'fish':
            return 'blue';
        case 'all':
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
        <S.Title>{titleCase(category)}</S.Title>
        <S.Text>{quantity}</S.Text>
    </S.Link>
);

CategoryCard.propTypes = {
    category: string.isRequired,
    quantity: number.isRequired
};

export default CategoryCard;
