import React from 'react';
import { func, instanceOf, string } from 'prop-types';
import dateFns from 'date-fns';
import Button from '../Button';
import * as S from './styles';

const DialDatePicker = ({ date, setDate, label }) => {
    /**
     * @param {string} direction either 'sub' or 'add'
     * @param {string} unit one of 'Days', 'Months', or 'Years'
     */
    const handleChange = (direction, unit) => () => {
        setDate(dateFns[`${direction}${unit}`](date, 1));
    };

    return (
        <S.Wrapper>
            {label && <S.Label>{label}</S.Label>}

            <S.Grid>
                <S.UpButton onClick={handleChange('add', 'Days')}>Up</S.UpButton>
                <S.DateSpan data-testid="dialDatePickerDay">
                    {dateFns.format(date, 'Do')}
                </S.DateSpan>
                <button type="button" onClick={handleChange('sub', 'Days')}>
                    Down
                </button>

                <S.UpButton onClick={handleChange('add', 'Months')}>Up</S.UpButton>
                <S.DateSpan data-testid="dialDatePickerMonth">
                    {dateFns.format(date, 'MMMM')}
                </S.DateSpan>
                <button type="button" onClick={handleChange('sub', 'Months')}>
                    Down
                </button>

                <S.UpButton onClick={handleChange('add', 'Years')}>Up</S.UpButton>
                <S.DateSpan data-testid="dialDatePickerYear">
                    {dateFns.format(date, 'YYYY')}
                </S.DateSpan>
                <button type="button" onClick={handleChange('sub', 'Years')}>
                    Down
                </button>
            </S.Grid>

            <Button onClick={handleChange('add', 'Weeks')}>Add 1 week</Button>
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

export default DialDatePicker;
