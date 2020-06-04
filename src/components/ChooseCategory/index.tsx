import React, { FC, useContext } from 'react';
import arraySort from 'array-sort';

import { FirebaseContext } from '../ProviderFirebase';
import { formatCategories } from '../PageAddFoodForm/utils';
import { CategoryButton } from '../CategoryButton';
import * as S from './styles';
import { CategoryType } from '../../types';

export type ChooseCategoryTypes = {
    onClick: (category: CategoryType) => void;
    selected?: CategoryType;
};

export const ChooseCategory: FC<ChooseCategoryTypes> = ({ onClick, selected }) => {
    const { categories } = useContext(FirebaseContext);

    const handleClick = (category: CategoryType) => () => onClick(category);

    const sortedArray = arraySort(formatCategories(categories), 'value');

    return (
        <S.Wrapper>
            <S.Title>What type of food?</S.Title>

            <S.Grid>
                {sortedArray.map((category) => (
                    <CategoryButton
                        isSelected={selected?.value === category.value}
                        name={category.label}
                        onClick={handleClick(category)}
                        data-testid={`${category.value}CategoryButton`}
                        key={category.value}
                    />
                ))}
            </S.Grid>
        </S.Wrapper>
    );
};
