import React, { FC } from 'react';
import { titleCase } from 'title-case';
import * as S from './styles';

export type CategoryFilterDesktopProps = {
    categories: { [category: string]: number };
    handleCategoryClick: (category: string) => void;
    selected: string;
};

export const CategoryFilterDesktop: FC<CategoryFilterDesktopProps> = ({
    categories,
    handleCategoryClick,
    selected
}) => {
    const handleClick = (category: string) => () => handleCategoryClick(category);
    const getTotalItems = () => {
        if (categories) {
            return Object.values(categories).reduce((acc, curr) => acc + curr, 0);
        }
        return 0;
    };

    return (
        <S.List>
            <S.Item key={'all'} onClick={handleClick('all')} isSelected={selected === 'all'}>
                {titleCase('all')}({getTotalItems()})
            </S.Item>

            {Object.entries(categories).map((entry) => (
                <S.Item key={entry[0]} onClick={handleClick(entry[0])} isSelected={selected === entry[0]}>
                    {titleCase(entry[0])}({entry[1]})
                </S.Item>
            ))}
        </S.List>
    );
};
