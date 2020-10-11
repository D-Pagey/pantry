import React, { FC } from 'react';

import { Button } from '../Button';
import * as S from './styles';

export type ModalHouseholdProps = {
    isAdmin: boolean;
    onModalClose: () => void;
};

export const ModalHousehold: FC<ModalHouseholdProps> = ({ isAdmin, onModalClose }) => {
    return (
        <S.List>
            <S.Item>Leave household</S.Item>
            {isAdmin && (
                <>
                    <S.Item>Promote to Admin</S.Item>
                    <S.Item>Kick from household</S.Item>
                </>
            )}
            <Button onClick={onModalClose}>Close</Button>
        </S.List>
    );
};
