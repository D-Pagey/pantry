import React, { FC } from 'react';
import { CategoryButton } from '../CategoryButton';
import * as S from './styles';

const categories = ['vegetables', 'fruit', 'dairy', 'meat', 'fish', '[opened tin]'];

export type ChooseCategoryTypes = {
    onClick: (category: string) => void;
    selected?: string;
};

export const ChooseCategory: FC<ChooseCategoryTypes> = ({ onClick, selected }) => {
    const handleClick = (category: string) => () => onClick(category);

    return (
        <div>
            <S.Title>What type of food?</S.Title>

            <S.Grid>
                {categories.map((category) => (
                    <CategoryButton
                        isSelected={selected === category}
                        name={category}
                        onClick={handleClick(category)}
                        data-testid={`${category}CategoryButton`}
                        key={category}
                    />
                ))}
            </S.Grid>
        </div>
    );
};
