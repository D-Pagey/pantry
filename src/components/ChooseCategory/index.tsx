import React, { FC } from 'react';

import { CategoryButton } from '../CategoryButton';
import * as S from './styles';

export type ChooseCategoryTypes = {
    handleClick: (category: string) => void;
    selected?: string;
};

const Categories = ['vegetable', 'fruit', 'dairy', 'meat', 'fish', '[opened tin]'];

export const ChooseCategory: FC<ChooseCategoryTypes> = ({ handleClick, selected }) => {
    const handleCategoryClick = (category: string) => () => handleClick(category);

    return (
        <S.Wrapper data-testid="chooseCategory">
            <S.Title>What type of food?</S.Title>

            <S.Grid>
                {Categories.map((category) => (
                    <CategoryButton
                        isSelected={selected === category}
                        name={category}
                        handleClick={handleCategoryClick(category)}
                        data-testid={`${category}CategoryButton`}
                        key={category}
                    />
                ))}
            </S.Grid>
        </S.Wrapper>
    );
};
