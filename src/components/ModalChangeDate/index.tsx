import { FC } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import * as S from './styles';

export type ModalChangeDateTypes = {
    expires: Date;
    handleDateChange: (date: Date) => void;
    handleModalClose: () => void;
};

export const ModalChangeDate: FC<ModalChangeDateTypes> = ({ expires, handleDateChange, handleModalClose }) => {
    return (
        <S.Wrapper data-testid="modalChangeDate">
            <S.Title>Change Date</S.Title>
            <DatePicker fixedHeight selected={expires} onChange={handleDateChange} inline />
            <S.Button secondary onClick={handleModalClose}>
                Back
            </S.Button>
        </S.Wrapper>
    );
};
