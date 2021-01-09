import React, { FC } from 'react';
import sortArray from 'sort-array';
import { titleCase } from 'title-case';

import { FoodType, TenantType } from '../../types';
import { getColourFromDate } from '../../utils';
import { CircleIcon } from '../CircleIcon';
import { Donut } from '../Donut';
import { getTotalServingsCount, reduceBatches, getBatchTenants } from './utils';
import * as S from './styles';

export type FoodCardProps = {
    handleClick?: () => void;
    item: FoodType;
    isSelected?: boolean;
    tenants: TenantType[];
};

export const FoodCard: FC<FoodCardProps> = ({ handleClick, isSelected, item, tenants }) => {
    const sortedBatches = sortArray(item.batches, {
        // @ts-ignore
        by: 'expires',
        order: 'asc'
    });
    const totalServings = getTotalServingsCount(sortedBatches);
    const sortedTenants = getBatchTenants(sortedBatches, tenants);
    // not very well named
    // basically choose whether or not we need to reduce the batches
    const circleIconBatches = totalServings <= 10 ? sortedBatches : reduceBatches(sortedBatches);

    return (
        <S.Wrapper onClick={handleClick} isSelected={isSelected}>
            <S.Name>{titleCase(item.name)}</S.Name>
            <S.Category>({item.category})</S.Category>

            {sortedTenants.map((owner, index, array) => {
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
