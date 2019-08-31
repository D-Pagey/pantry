import React, { Fragment, useContext } from 'react';
import { arrayOf, instanceOf, shape, string } from 'prop-types';
import { FirebaseContext } from '../ProviderFirebase';
import GridRows from './GridRows';
import * as S from './styles';

const FoodGrid = ({ data }) => {
    const { updateFridge } = useContext(FirebaseContext);

    const handleDelete = (name) => () => {
        const filteredItems = data.filter((item) => item.name !== name);
        updateFridge(filteredItems);
    };

    // must be a cleaner way to do this
    const categories = data.map((item) => item.category.label);
    const uniqueCategories = categories.filter((item, index) => categories.indexOf(item) === index);

    return (
        <S.Wrapper>
            <S.Heading>Name</S.Heading>
            <S.Heading>Expires</S.Heading>
            <S.Heading>Servings</S.Heading>
            <S.Heading>Amend</S.Heading>

            {uniqueCategories.map((category) => (
                <Fragment key={category}>
                    <S.Category>{category}</S.Category>
                    <GridRows
                        data={data.filter((item) => item.category.label === category)}
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
            expires: instanceOf(Date).isRequired,
            name: string.isRequired,
            servings: shape({
                label: string.isRequired,
                value: string.isRequired
            }).isRequired
        }).isRequired
    ).isRequired
};

export default FoodGrid;
