import React, { FC } from 'react';

import { CategoryButton } from '../CategoryButton';
import * as S from './styles';

export type ChooseCategoryProps = {
    handleClick: (category: string) => void;
    selected?: string;
    small?: boolean;
};

const Categories = ['vegetables', 'fruit', 'dairy', 'meat', 'fish', 'misc.'];

export const ChooseCategory: FC<ChooseCategoryProps> = ({ handleClick, selected, small }) => {
    const handleCategoryClick = (category: string) => () => handleClick(category);

    return (
        <S.Wrapper data-testid="chooseCategory">
            <S.Title>What type of food?</S.Title>

            <S.GreyText>We will remember this choice for next time</S.GreyText>

            <S.Grid small={small}>
                {Categories.map((category) => (
                    <CategoryButton
                        data-testid={`${category}CategoryButton`}
                        handleClick={handleCategoryClick(category)}
                        isSelected={selected === category}
                        key={category}
                        name={category}
                        small={small}
                    />
                ))}
            </S.Grid>
        </S.Wrapper>
    );
};
