import React, { FC } from 'react';
import { titleCase } from 'title-case';
import * as S from './styles';

type CategoryButtonTypes = {
    isSelected?: boolean;
    name: string;
    handleClick: Function;
};

export const CategoryButton: FC<CategoryButtonTypes> = ({ isSelected, name, handleClick, ...props }) => (
    <S.Button isSelected={isSelected} onClick={handleClick} data-testid={`categoryCard${name}`} {...props}>
        <S.Name isSelected={isSelected}>{titleCase(name)}</S.Name>
    </S.Button>
);
