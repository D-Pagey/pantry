import React from 'react';
import { number, string } from 'prop-types';
import { titleCase } from 'title-case';
import * as S from './styles';

type CategoryCardTypes = {
    label: string;
    colour: string;
    quantity: number;
};

const CategoryCard = ({ colour, label, quantity }: CategoryCardTypes): JSX.Element => (
    <S.Link colour={colour} to={`/food/${label.toLowerCase()}`} data-testid="categoryCard">
        <S.Title>{titleCase(label)}</S.Title>
        <S.Text>{quantity}</S.Text>
    </S.Link>
);

CategoryCard.propTypes = {
    label: string.isRequired,
    colour: string.isRequired,
    quantity: number.isRequired
};

export default CategoryCard;
