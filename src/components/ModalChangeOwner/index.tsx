import { FC } from 'react';
import { differenceInDays, formatDistanceToNowStrict } from 'date-fns';
import { BatchType, TenantType } from '../../types';
import { getColourFromDate } from '../../utils';
import * as S from './styles';

export type ModalChangeOwnerProps = {
    handleModalClose: () => void;
    handleOwnerChange: (ownerId: string, batchId: string) => void;
    itemName: string;
    selectedBatch: BatchType;
    tenants: TenantType[];
    unit: string;
};

export const ModalChangeOwner: FC<ModalChangeOwnerProps> = ({
    handleModalClose,
    handleOwnerChange,
    itemName,
    selectedBatch,
    tenants,
    unit
}) => {
    const currentOwner = tenants.filter((tenant) => tenant.uid === selectedBatch.ownerId)[0];
    const unselectedTenants = tenants.filter((tenant) => tenant.uid !== currentOwner.uid);

    const handleOwnerClick = (ownerId: string, batchId: string) => () => {
        handleOwnerChange(ownerId, batchId);
    };

    const getDate = (date: Date) => {
        const difference = differenceInDays(date, Date.now());
        const isLessThanOneDay = difference === 0;
        const quantity = isLessThanOneDay ? 1 : parseInt(formatDistanceToNowStrict(date).split(' ')[0], 10);
        const unitOfTime = formatDistanceToNowStrict(date).split(' ')[1];
        const unit = isLessThanOneDay ? 'day' : unitOfTime;

        return `${quantity} ${unit}`;
    };

    return (
        <S.Wrapper data-testid="modalChangeOwner">
            <S.Title>Change Owner</S.Title>
            <S.Text>
                This <S.Green>{unit}</S.Green> of <S.Green>{itemName}</S.Green> is{' '}
                <S.BoldGreen>{currentOwner.name}&apos;s</S.BoldGreen> and is expiring in{' '}
                <S.Date color={getColourFromDate(selectedBatch.expires)}>{getDate(selectedBatch.expires)}</S.Date>.
            </S.Text>

            {unselectedTenants.length > 0 ? (
                <>
                    <S.Subtitle>Click a photo to change the owner</S.Subtitle>
                    <S.TenantsWrapper>
                        {unselectedTenants.map((tenant) => (
                            <S.TenantPhoto
                                key={tenant.uid}
                                photo={tenant.photo}
                                email={tenant.email}
                                onClick={handleOwnerClick(tenant.uid, selectedBatch.id)}
                            />
                        ))}
                    </S.TenantsWrapper>
                </>
            ) : (
                <S.Text italic>
                    There is no one else in your household to change to. You can invite friends via the Settings page.
                </S.Text>
            )}

            <S.Button secondary onClick={handleModalClose}>
                Back
            </S.Button>
        </S.Wrapper>
    );
};
