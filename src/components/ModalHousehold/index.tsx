import React, { FC } from 'react';

import { Button } from '../Button';
import * as S from './styles';

export type ModalHouseholdProps = {
    isCurrentUser: boolean;
    onModalClose: () => void;
    handleLeaveHousehold: () => void;
};

export const ModalHousehold: FC<ModalHouseholdProps> = ({ handleLeaveHousehold, isCurrentUser, onModalClose }) => {
    return (
        <S.List>
            {isCurrentUser && <S.Item onClick={handleLeaveHousehold}>Leave household</S.Item>}
            <Button onClick={onModalClose}>Close</Button>
        </S.List>
    );
};
