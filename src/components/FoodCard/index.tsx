import React, { FC } from 'react';
import arraySort from 'array-sort';
import { format } from 'date-fns';
import { titleCase } from 'title-case';

import { BatchType } from '../../types';
import { getColourFromDate } from '../../utils';
import { CircleIcon } from '../CircleIcon';
import { Donut } from '../Donut';
import { getTotalServingsCount, reduceBatches, getOwnerPhotoAndName } from './utils';
import * as S from './styles';

export type FoodCardProps = {
    batches: BatchType[];
    handleClick?: Function;
    isSelected?: boolean;
    margin?: string;
    name: string;
};

export const FoodCard: FC<FoodCardProps> = ({ batches, handleClick, isSelected, margin, name }) => {
    const sortedBatches = arraySort(batches, 'expires');
    const sortedOwnerPhotoAndName = getOwnerPhotoAndName(sortedBatches);
    const totalServings = getTotalServingsCount(sortedBatches);
    // not very well named
    // basically choose whether or not we need to reduce the batches
    const circleIconBatches = totalServings <= 10 ? sortedBatches : reduceBatches(sortedBatches);

    return (
        <S.Wrapper margin={margin} onClick={handleClick} isSelected={isSelected}>
            <S.Name>{titleCase(name)}</S.Name>
            <S.Date>{format(sortedBatches[0].expires, 'do MMM')}</S.Date>

            {sortedOwnerPhotoAndName.map((owner, index, array) => {
                return (
                    <S.OwnerPicture
                        // eslint-disable-next-line react/no-array-index-key
                        key={`${owner.photo}-${index}`}
                        index={index}
                        length={array.length}
                        owner={owner}
                        alt="food owner"
                        width="50px"
                    />
                );
            })}

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
