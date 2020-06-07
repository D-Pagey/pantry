import React, { FC } from 'react';
import { differenceInDays, format } from 'date-fns';
import { titleCase } from 'title-case';

import { colours } from '../../tokens';
import { chooseDateColour } from '../../utils';
import { CircleIcon } from '../CircleIcon';
import { DonutIcon } from '../DonutIcon';
import * as S from './styles';

type FoodCardProps = {
    date: Date;
    margin?: string;
    name: string;
};

export const FoodCard: FC<FoodCardProps> = ({ date, margin, name }) => (
    <S.Wrapper margin={margin}>
        <S.Name>{titleCase(name)}</S.Name>
        <S.Date>{format(date, 'do MMM')}</S.Date>

        <S.CircleWrapper>
            <CircleIcon colour={colours.orange} margin="0 4px 0 0" />
            <CircleIcon colour={colours.darkGreen100} margin="0 4px 0 0" />
            <CircleIcon colour={colours.darkGreen100} />
        </S.CircleWrapper>

        <S.DaysWrapper>
            <S.Days>{differenceInDays(date, new Date())}</S.Days>
            <DonutIcon colour={chooseDateColour(date)} />
        </S.DaysWrapper>
    </S.Wrapper>
);
