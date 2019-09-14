import React, { Fragment, useContext } from 'react';
import { FirebaseContext } from '../ProviderFirebase';
import GridRows from './GridRows';
import * as S from './styles';

const FoodGrid = () => {
    const { categories, fridge, updateFridge } = useContext(FirebaseContext);

    const handleDelete = (name) => () => {
        const filteredItems = fridge.filter((item) => item.name !== name);
        updateFridge(filteredItems);
    };

    return (
        <S.Wrapper>
            <S.Heading>Name</S.Heading>
            <S.Heading>Expires</S.Heading>
            <S.Heading>Servings</S.Heading>
            <S.Heading>Amend</S.Heading>

            {categories.map((category) => (
                <Fragment key={category}>
                    <S.Category>{category}</S.Category>
                    <GridRows
                        data={fridge.filter((item) => item.category.label === category)}
                        handleDelete={handleDelete}
                    />
                </Fragment>
            ))}
        </S.Wrapper>
    );
};

export default FoodGrid;
