import React, { FC } from 'react';
import { colours } from '../../tokens';
import { Button } from '../Button';
import * as S from './styles';

export type ModalHouseholdProps = {
    handleCancelInvite: () => void;
    handleClose: () => void;
    handleLeaveHousehold: () => void;
    handlePromoteUser: () => void;
    handleRemoveUser: () => void;
    showCancelOption: boolean;
    showLeaveOption: boolean;
    showPromoteOption: boolean;
    showRemoveOption: boolean;
};

export const ModalHousehold: FC<ModalHouseholdProps> = ({
    handleCancelInvite,
    handleClose,
    handleLeaveHousehold,
    handlePromoteUser,
    handleRemoveUser,
    showCancelOption,
    showLeaveOption,
    showPromoteOption,
    showRemoveOption
}) => {
    return (
        <S.Wrapper>
            <S.Title>Household Options:</S.Title>

            {showRemoveOption && (
                <S.ColouredButton color={colours.blue} onClick={handleRemoveUser}>
                    Remove User
                </S.ColouredButton>
            )}

            {showCancelOption && (
                <S.ColouredButton color={colours.blue} onClick={handleCancelInvite}>
                    Cancel Invite
                </S.ColouredButton>
            )}

            {showPromoteOption && (
                <S.ColouredButton color={colours.darkGreen100} onClick={handlePromoteUser}>
                    Promote to Owner
                </S.ColouredButton>
            )}

            {showLeaveOption && (
                <S.ColouredButton color={colours.red} onClick={handleLeaveHousehold}>
                    Leave household
                </S.ColouredButton>
            )}
            <Button onClick={handleClose}>Close</Button>
        </S.Wrapper>
    );
};
