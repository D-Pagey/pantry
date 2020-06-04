import React, { FC, MouseEvent } from 'react';
import { titleCase } from 'title-case';
import * as S from './styles';

type CategoryButtonTypes = {
    isSelected?: boolean;
    name: string;
    onClick?: (event: MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const CategoryButton: FC<CategoryButtonTypes> = ({ isSelected, name, onClick, ...props }) => (
    <S.Button isSelected={isSelected} onClick={onClick} data-testid={`categoryCard${name}`} {...props}>
        <S.Name isSelected={isSelected}>{titleCase(name)}</S.Name>
    </S.Button>
);
