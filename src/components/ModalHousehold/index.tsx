import { FC, useState, useEffect } from 'react';
import { colours } from '../../tokens';
import { TenantType } from '../../types';
import { Button } from '../Button';
import * as S from './styles';

export type ModalHouseholdProps = {
    currentTenant: TenantType;
    handleCancelInvite: () => void;
    handleClose: () => void;
    handleLeaveHousehold: () => void;
    handlePromoteUser: () => void;
    handleRemoveUser: () => void;
    loading: boolean;
    selectedTenant?: TenantType;
};

export const ModalHousehold: FC<ModalHouseholdProps> = ({
    currentTenant,
    handleCancelInvite,
    handleClose,
    handleLeaveHousehold,
    handlePromoteUser,
    handleRemoveUser,
    loading,
    selectedTenant
}) => {
    const [showCancelOption, setShowCancelOption] = useState(false);
    const [showLeaveOption, setShowLeaveOption] = useState(false);
    const [showPromoteOption, setShowPromoteOption] = useState(false);
    const [showRemoveOption, setShowRemoveOption] = useState(false);

    useEffect(() => {
        if (selectedTenant?.houseRole === 'pending') {
            setShowCancelOption(true);
        }

        if (selectedTenant?.uid === currentTenant.uid) {
            setShowLeaveOption(true);
        }

        if (
            currentTenant.houseRole === 'admin' &&
            selectedTenant?.uid !== currentTenant.uid &&
            selectedTenant?.houseRole !== 'pending' &&
            selectedTenant?.houseRole !== 'admin'
        ) {
            setShowPromoteOption(true);
            setShowRemoveOption(true);
        }
    }, [currentTenant.houseRole, currentTenant.uid, selectedTenant?.houseRole, selectedTenant?.uid]);

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
