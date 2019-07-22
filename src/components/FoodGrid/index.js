import React, { Fragment, useContext } from 'react';
import { arrayOf, shape, string } from 'prop-types';
import { FirebaseContext } from '../ProviderFirebase';
import GridRows from './GridRows';
import * as S from './styles';

const FoodGrid = ({ data }) => {
    const { updateFridge } = useContext(FirebaseContext);

    const handleDelete = (name) => () => {
        const filteredItems = data.filter((item) => item.name !== name);
        updateFridge(filteredItems);
    };

    const categories = data.map((item) => item.category.label);
    const uniques = categories.filter((item, index) => categories.indexOf(item) === index);

    return (
        <S.Wrapper>
            <S.Heading>Name</S.Heading>
            <S.Heading>Expires</S.Heading>
            <S.Heading>Quantity</S.Heading>
            <S.Heading>Amend</S.Heading>

            {uniques.map((item) => (
                <Fragment key={item}>
                    <S.Category>{item}</S.Category>
                    <GridRows
                        data={data.filter((i) => i.category.label === item)}
                        handleDelete={handleDelete}
                    />
                </Fragment>
            ))}
        </S.Wrapper>
    );
};

FoodGrid.propTypes = {
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

export default FoodGrid;
