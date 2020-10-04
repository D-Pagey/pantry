import React, { FC } from 'react';
import { titleCase } from 'title-case';
import * as S from './styles';

export type CategoryButtonProps = {
    isSelected?: boolean;
    small?: boolean;
    name: string;
    handleClick: Function;
};

export const CategoryButton: FC<CategoryButtonProps> = ({ handleClick, isSelected, name, small, ...props }) => (
    <S.Button
        data-testid={`categoryCard${name}`}
        isSelected={isSelected}
        onClick={handleClick}
        small={small}
        {...props}
    >
        <S.Name isSelected={isSelected}>{titleCase(name)}</S.Name>
    </S.Button>
);
