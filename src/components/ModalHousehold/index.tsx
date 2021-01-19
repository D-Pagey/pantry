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
    loading: boolean;
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
    loading,
    showCancelOption,
    showLeaveOption,
    showPromoteOption,
    showRemoveOption
}) => {
    return (
        <S.Wrapper>
            <S.Title>Household Options:</S.Title>

            {showCancelOption && (
                <S.ColouredButton color={colours.blue} disabled={loading} onClick={handleCancelInvite}>
                    Cancel Invite
                </S.ColouredButton>
            )}

            {showPromoteOption && (
                <S.ColouredButton color={colours.darkGreen100} disabled={loading} onClick={handlePromoteUser}>
                    Promote to Owner
                </S.ColouredButton>
            )}

            {showRemoveOption && (
                <S.ColouredButton color={colours.red} disabled={loading} onClick={handleRemoveUser}>
                    Remove User
                </S.ColouredButton>
            )}

            {showLeaveOption && (
                <S.ColouredButton color={colours.red} disabled={loading} onClick={handleLeaveHousehold}>
                    Leave household
                </S.ColouredButton>
            )}
            <Button onClick={handleClose} isLoading={loading} loadingContent="Working">
                Close
            </Button>
        </S.Wrapper>
    );
};
