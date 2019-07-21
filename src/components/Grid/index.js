import React, { Fragment } from 'react';
import { arrayOf, shape, string } from 'prop-types';
import * as S from './styles';

const Grid = ({ data }) => (
    <S.Wrapper>
        <S.Heading>Name</S.Heading>
        <S.Heading>Expires</S.Heading>
        <S.Heading>Quantity</S.Heading>

        {data.map((item) => (
            <Fragment key={item.name}>
                <li>{item.name}</li>
                <li>{item.expires}</li>
                <li>{item.servings} Servings</li>
            </Fragment>
        ))}
    </S.Wrapper>
);

Grid.propTypes = {
    data: arrayOf(
        shape({
            category: shape({
                label: string.isRequired,
                value: string.isRequired
            }).isRequired,
            expires: string.isRequired,
            name: string.isRequired,
            servings: string.isRequired
        }).isRequired
    ).isRequired
};

export default Grid;
