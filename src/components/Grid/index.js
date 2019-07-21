import React, { Fragment, useContext } from 'react';
import { arrayOf, shape, string } from 'prop-types';
import { FirebaseContext } from '../ProviderFirebase';
import deleteIcon from './assets/delete.svg';
import * as S from './styles';

const Grid = ({ data }) => {
    const { updateFridge } = useContext(FirebaseContext);

    const handleDelete = (name) => () => {
        const filteredItems = data.filter((item) => item.name !== name);
        updateFridge(filteredItems);
    };

    return (
        <S.Wrapper>
            <S.Heading>Name</S.Heading>
            <S.Heading>Expires</S.Heading>
            <S.Heading>Quantity</S.Heading>
            <S.Heading>Amend</S.Heading>

            {data.map((item) => (
                <Fragment key={item.name}>
                    <li>{item.name}</li>
                    <li>{item.expires}</li>
                    <li>{item.servings} Servings</li>
                    <li>
                        {/* eslint-disable */}
                        <img
                            src={deleteIcon}
                            alt="delete"
                            onClick={handleDelete(item.name)}
                            style={{ cursor: 'pointer' }}
                        />
                    </li>
                </Fragment>
            ))}
        </S.Wrapper>
    );
};

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
