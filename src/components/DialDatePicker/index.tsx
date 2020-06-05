import React, { FC } from 'react';
import { format, addDays, addMonths, addYears, addWeeks, subDays, subMonths, subYears } from 'date-fns';
import { Button } from '../Button';
import * as S from './styles';

type DialDatePickerTypes = {
    date: Date;
    setDate: Function;
};

export const DialDatePicker: FC<DialDatePickerTypes> = ({ date, setDate }) => {
    const handleChange = (handler: Function) => (): Function => setDate(handler(date, 1));

    return (
        <S.Wrapper>
            <S.Grid>
                <S.UpButton onClick={handleChange(addDays)}>Up</S.UpButton>
                <S.DateSpan data-testid="dialDatePickerDay">{format(date, 'do')}</S.DateSpan>
                <button type="button" onClick={handleChange(subDays)}>
                    Down
                </button>

                <S.UpButton onClick={handleChange(addMonths)}>Up</S.UpButton>
                <S.DateSpan data-testid="dialDatePickerMonth">{format(date, 'MMMM')}</S.DateSpan>
                <button type="button" onClick={handleChange(subMonths)}>
                    Down
                </button>

                <S.UpButton onClick={handleChange(addYears)}>Up</S.UpButton>
                <S.DateSpan data-testid="dialDatePickerYear">{format(date, 'yyyy')}</S.DateSpan>
                <button type="button" onClick={handleChange(subYears)}>
                    Down
                </button>
            </S.Grid>

            <Button onClick={handleChange(addWeeks)}>Add 1 week</Button>
        </S.Wrapper>
    );
};
