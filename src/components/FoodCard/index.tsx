import React, { FC } from 'react';
import { colours } from '../../tokens';
import { CircleIcon } from '../CircleIcon';
import { DonutIcon } from '../DonutIcon';
import * as S from './styles';

type FoodCardProps = {
    date: string;
    name: string;
};

export const FoodCard: FC<FoodCardProps> = ({ date, name }) => (
    <S.Wrapper>
        <S.Name>{name}</S.Name>
        <S.Date>{date}</S.Date>

        <S.CircleWrapper>
            <CircleIcon colour={colours.orange} margin="0 4px 0 0" />
            <CircleIcon colour={colours.darkGreen100} margin="0 4px 0 0" />
            <CircleIcon colour={colours.darkGreen100} />
        </S.CircleWrapper>

        <S.DaysWrapper>
            <S.Days>3</S.Days>
            <DonutIcon colour={colours.orange} />
        </S.DaysWrapper>
    </S.Wrapper>
);
