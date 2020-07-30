import React, { FC } from 'react';
import arraySort from 'array-sort';
import { format } from 'date-fns';
import { titleCase } from 'title-case';

import { FoodCardBatchType } from '../../types';
import { getColourFromDate } from '../../utils';
import { CircleIcon } from '../CircleIcon';
import { Donut } from '../Donut';
import { getTotalServingsCount, reduceBatches, getBatchPhotos } from './utils';
import * as S from './styles';

type FoodCardProps = {
    batches: FoodCardBatchType[];
    handleClick?: Function;
    isSelected?: boolean;
    margin?: string;
    name: string;
};

export const FoodCard: FC<FoodCardProps> = ({ batches, handleClick, isSelected, margin, name }) => {
    const sortedBatches = arraySort(batches, 'expires');
    const totalServings = getTotalServingsCount(sortedBatches);
    // not very well named
    // basically choose whether or not we need to reduce the batches
    const circleIconBatches = totalServings <= 10 ? sortedBatches : reduceBatches(sortedBatches);
    const ownerPhotos = getBatchPhotos(sortedBatches);

    return (
        <S.Wrapper margin={margin} onClick={handleClick} isSelected={isSelected}>
            <S.Name>{titleCase(name)}</S.Name>
            <S.Date>{format(sortedBatches[0].expires, 'do MMM')}</S.Date>

            {ownerPhotos.map((photo, index) => (
                <S.OwnerPicture key={photo} src={photo} alt="food owner" index={index} />
            ))}

            <S.CircleWrapper>
                {circleIconBatches.map((batch) => {
                    return [...Array(batch.servings)].map((_, i) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <CircleIcon key={i} colour={getColourFromDate(batch.expires)} margin="0 4px 0 0" />
                    ));
                })}
            </S.CircleWrapper>

            <S.DonutWrapper>
                <Donut date={sortedBatches[0].expires} />
            </S.DonutWrapper>
        </S.Wrapper>
    );
};
