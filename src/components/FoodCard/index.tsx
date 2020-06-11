import React, { FC } from 'react';
import arraySort from 'array-sort';
import { differenceInDays, format } from 'date-fns';
import { titleCase } from 'title-case';

import { BatchType } from '../../types';
import { chooseDateColour } from '../../utils';
import { CircleIcon } from '../CircleIcon';
import { DonutIcon } from '../DonutIcon';
import * as S from './styles';

type FoodCardProps = {
    batches: BatchType[];
    margin?: string;
    name: string;
};

export const FoodCard: FC<FoodCardProps> = ({ batches, margin, name }) => {
    const sortedBatches = arraySort(batches, 'expires');

    return (
        <S.Wrapper margin={margin}>
            <S.Name>{titleCase(name)}</S.Name>
            <S.Date>{format(batches[0].expires, 'do MMM')}</S.Date>

            <S.CircleWrapper>
                {sortedBatches.map((batch) => {
                    return [...Array(batch.servings)].map((e, i) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <CircleIcon key={i} colour={chooseDateColour(batch.expires)} margin="0 4px 0 0" />
                    ));
                })}
            </S.CircleWrapper>

            <S.DaysWrapper>
                <S.Days>{differenceInDays(batches[0].expires, new Date())}</S.Days>
                <DonutIcon colour={chooseDateColour(batches[0].expires)} />
            </S.DaysWrapper>
        </S.Wrapper>
    );
};
