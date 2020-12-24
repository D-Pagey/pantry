import React, { FC } from 'react';
import { titleCase } from 'title-case';
import * as S from './styles';

export type CategoryButtonProps = {
    isSelected?: boolean;
    name: string;
    handleClick: () => void;
};

export const CategoryButton: FC<CategoryButtonProps> = ({ handleClick, isSelected, name, ...props }) => (
    <S.Button data-testid={`categoryCard${name}`} isSelected={isSelected} onClick={handleClick} {...props}>
        <S.Name isSelected={isSelected}>{titleCase(name)}</S.Name>
    </S.Button>
);
