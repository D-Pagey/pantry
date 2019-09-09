import React from 'react';
import { string } from 'prop-types';
import * as S from './styles';

const CategoryCard = ({ colour }) => (
    <S.Wrapper colour={colour}>
        <S.Title>Meat</S.Title>
        <S.Text>2</S.Text>
    </S.Wrapper>
);

CategoryCard.propTypes = {
    colour: string.isRequired
};

export default CategoryCard;
