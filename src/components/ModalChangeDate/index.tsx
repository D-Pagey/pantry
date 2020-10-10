import React, { FC } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Button } from '../Button';
import * as S from './styles';

type ModalChangeDateTypes = {
    expires: Date;
    handleDateChange: (date: Date) => void;
    handleModalClose: () => void;
};

export const ModalChangeDate: FC<ModalChangeDateTypes> = ({ expires, handleDateChange, handleModalClose }) => {
    return (
        <S.Wrapper data-testid="modalChangeDate">
            <p>Edit the expiry date for this batch</p>
            <DatePicker selected={expires} onChange={handleDateChange} inline />
            <Button secondary onClick={handleModalClose}>
                Back
            </Button>
        </S.Wrapper>
    );
};
