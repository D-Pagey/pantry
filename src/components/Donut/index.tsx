import { FC } from 'react';
import { differenceInDays, formatDistanceToNowStrict } from 'date-fns';

import { getColourFromDate, getPercentageFromDate } from '../../utils';
import * as S from './styles';

type DonutIconProps = {
    date: Date;
};

export const Donut: FC<DonutIconProps> = ({ date }) => {
    const difference = differenceInDays(date, Date.now());
    const differentRelativeToUnit = parseInt(formatDistanceToNowStrict(date).split(' ')[0], 10);
    // seperates out unit from time
    const unitOfTime = formatDistanceToNowStrict(date).split(' ')[1];
    const isLessThanOneDay = difference === 0;
    const hasExpired = difference < 0;
    const percentage = getPercentageFromDate(date);
    const cx = 50;
    const cy = 50;
    const radius = 45;
    const perimeter = 2 * Math.PI * radius;
    const perimeterGap = perimeter - perimeter * (percentage / 100);

    return (
        <S.Wrapper>
            <svg width="100%" height="100%" viewBox="0 0 100 100">
                <S.Circle
                    cx={cx}
                    cy={cy}
                    r={radius}
                    perimeter={perimeter}
                    perimeterGap={perimeterGap}
                    transform={`rotate(-90 ${cx} ${cy})`}
                    color={getColourFromDate(date)}
                />

                {hasExpired ? (
                    <S.ExpiredText x="50%" y="51%">
                        Expired
                    </S.ExpiredText>
                ) : (
                    <>
                        <S.Text x="50%" y="38%">
                            {isLessThanOneDay ? 1 : differentRelativeToUnit}
                        </S.Text>

                        <S.Subtext x="51%" y="67%">
                            {isLessThanOneDay ? 'day' : unitOfTime}
                        </S.Subtext>
                    </>
                )}
            </svg>
        </S.Wrapper>
    );
};
