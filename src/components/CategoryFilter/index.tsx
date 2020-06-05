import React, { FC } from 'react';
import * as S from './styles';

export type CategoryFilterProps = {
    selected: string;
    setSelected: (category: string) => void;
};

export const CategoryFilter: FC<CategoryFilterProps> = ({ selected, setSelected }) => {
    const handleClick = (category: string) => () => setSelected(category);

    return (
        <S.Wrapper>
            <S.List>
                <S.Item isSelected={selected === 'all'} onClick={handleClick('all')}>
                    All
                </S.Item>
                <S.Item isSelected={selected === 'vegetables'} onClick={handleClick('vegetables')}>
                    Veg
                </S.Item>
                <S.Item isSelected={selected === 'fruit'} onClick={handleClick('fruit')}>
                    Fruit
                </S.Item>
                <S.Item isSelected={selected === 'meat'} onClick={handleClick('meat')}>
                    Meat
                </S.Item>
                <S.Item isSelected={selected === 'dairy'} onClick={handleClick('dairy')}>
                    Dairy
                </S.Item>
                <S.Item isSelected={selected === 'fish'} onClick={handleClick('fish')}>
                    Fish
                </S.Item>
            </S.List>
        </S.Wrapper>
    );
};
