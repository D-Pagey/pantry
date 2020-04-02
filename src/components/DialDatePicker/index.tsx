import React from 'react';
import { func, instanceOf, string } from 'prop-types';
import { format, addDays, addMonths, addYears, addWeeks, subDays, subMonths, subYears } from 'date-fns';
import { Button } from '../Button';
import { FormLabel } from '../FormLabel';
import * as S from './styles';

type DialDatePickerProps = {
    date: Date;
    setDate: Function;
    label?: string;
};

export const DialDatePicker: React.FC<DialDatePickerProps> = ({ date, setDate, label }) => {
    const handleChange = (handler: Function) => (): Function => setDate(handler(date, 1));

    return (
        <S.Wrapper>
            {label && <FormLabel>{label}</FormLabel>}

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

DialDatePicker.propTypes = {
    date: instanceOf(Date).isRequired,
    label: string,
    setDate: func.isRequired
};

DialDatePicker.defaultProps = {
    label: ''
};
