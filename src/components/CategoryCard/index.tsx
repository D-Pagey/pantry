import React from 'react';
import { titleCase } from 'title-case';
import * as S from './styles';

type CategoryCardTypes = {
    name: string;
    colour: string;
    quantity: number;
};

export const CategoryCard = ({ colour, name, quantity }: CategoryCardTypes): JSX.Element => (
    <S.Link colour={colour} to={`/food/${name.toLowerCase()}`} data-testid={`categoryCard${name}`}>
        <S.Title>{titleCase(name)}</S.Title>
        <S.Text>{quantity}</S.Text>
    </S.Link>
);
