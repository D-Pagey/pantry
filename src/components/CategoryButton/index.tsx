import React, { FC } from 'react';
import { titleCase } from 'title-case';
import * as S from './styles';

type CategoryButtonTypes = {
    name: string;
    onClick: Function;
};

export const CategoryButton: FC<CategoryButtonTypes> = ({ name, onClick, ...props }) => (
    <S.Button onClick={onClick} data-testid={`categoryCard${name}`} {...props}>
        <S.Name>{titleCase(name)}</S.Name>
    </S.Button>
);
