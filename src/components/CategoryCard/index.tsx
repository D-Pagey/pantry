import React from 'react';
import { number, string } from 'prop-types';
import { titleCase } from 'title-case';
import * as S from './styles';

type CategoryCardTypes = {
    colour: string;
    count: number;
    label: string;
};

export const CategoryCard = ({ colour, count, label }: CategoryCardTypes): JSX.Element => (
    <S.Link colour={colour} to={`/food/${label.toLowerCase()}`} data-testid="categoryCard">
        <S.Title>{titleCase(label)}</S.Title>
        <S.Text>{count}</S.Text>
    </S.Link>
);

CategoryCard.propTypes = {
    colour: string.isRequired,
    count: number.isRequired,
    label: string.isRequired
};
