import { FC } from 'react';
import { differenceInDays, formatDistanceToNowStrict } from 'date-fns';
import { BatchType, TenantType } from '../../types';
import { getColourFromDate } from '../../utils';
import * as S from './styles';

export type ModalChangeOwnerProps = {
    handleModalClose: () => void;
    itemName: string;
    selectedBatch: BatchType;
    tenants: TenantType[];
    unit: string;
};

export const ModalChangeOwner: FC<ModalChangeOwnerProps> = ({
    handleModalClose,
    itemName,
    selectedBatch,
    tenants,
    unit
}) => {
    const currentOwner = tenants.filter((tenant) => tenant.uid === selectedBatch.ownerId)[0];

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

            <S.Subtitle>Click a photo to change the owner</S.Subtitle>
            <S.TenantsWrapper>
                {tenants.reduce((acc, curr) => {
                    if (curr.uid === currentOwner.uid) return acc;

                    return [...acc, <S.TenantPhoto key={curr.uid} photo={curr.photo} email={curr.email} />];
                }, [] as JSX.Element[])}
            </S.TenantsWrapper>

            <S.Button secondary onClick={handleModalClose}>
                Back
            </S.Button>
        </S.Wrapper>
    );
};
