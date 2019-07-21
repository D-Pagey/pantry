import React, { Fragment } from 'react';
import { arrayOf, number, shape, string } from 'prop-types';
import * as S from './styles';

const Grid = ({ data }) => (
    <S.Wrapper>
        <S.Heading>Name</S.Heading>
        <S.Heading>Servings</S.Heading>

        {data.map((item) => (
            <Fragment key={item.name}>
                <li>{item.name}</li>
                <li>{item.servings}</li>
            </Fragment>
        ))}
    </S.Wrapper>
);

Grid.propTypes = {
    data: arrayOf(
        shape({
            category: string.isRequired,
            name: string.isRequired,
            servings: number.isRequired
        }).isRequired
    ).isRequired
};

export default Grid;
