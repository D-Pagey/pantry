import React, { FC, useState } from 'react';
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';

import { firebase } from '../../services';
import { TenantType, HouseRoleType, UserType } from '../../types';
import threeDots from '../../assets/three-dots.svg';
import { ModalHousehold } from '../ModalHousehold';
import * as S from './styles';

const getEmoji = (houseRole: HouseRoleType) => {
    if (houseRole === 'admin') {
        return (
            // eslint-disable-next-line
            <S.Span role="img" aria-label="avocado">
                🥑
            </S.Span>
        );
    }

    if (houseRole === 'tenant') {
        return (
            // eslint-disable-next-line
            <S.Span role="img" aria-label="carrot">
                🥕
            </S.Span>
        );
    }

    if (houseRole === 'alexa') {
        return (
            // eslint-disable-next-line
            <S.Span role="img" aria-label="robot">
                🤖
            </S.Span>
        );
    }

    // pending
    return (
        // eslint-disable-next-line
        <S.Span role="img" aria-label="potato">
            🥔
        </S.Span>
    );
};

export type HouseholdProps = {
    tenants: TenantType[];
    user: Partial<UserType>;
};

const leaveCurrentHousehold = firebase.functions().httpsCallable('leaveCurrentHousehold');

export const Household: FC<HouseholdProps> = ({ tenants, user }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const sortOrder: HouseRoleType[] = ['admin', 'tenant', 'alexa', 'pending'];

    const sortedTenants = [...tenants].sort((a, b) => {
        const aOrder = sortOrder.indexOf(a.houseRole);
        const bOrder = sortOrder.indexOf(b.houseRole);

        if (aOrder < bOrder) return -1;
        if (aOrder > bOrder) return 1;

        return 0;
    });

    const handleLeaveHousehold = async () => {
        const noPendingTenants = tenants.filter((tenant) => tenant.houseRole !== 'pending');

        if (noPendingTenants.length === 2) {
            toast.error(`You can't leave as the only person in the household`);
        } else {
            const currentTenant = tenants.filter((tenant) => tenant.uid === user.uid)[0];

            try {
                const { data } = await leaveCurrentHousehold({ householdId: user.household, tenant: currentTenant });

                console.log({ data });
            } catch (error) {
                console.log({ error });
            }
        }
        setIsModalOpen(false);
    };

    return (
        <S.List>
            {sortedTenants.map((tenant) => {
                const isAlexa = tenant.houseRole === 'alexa';
                const isPending = tenant.houseRole === 'pending';

                return (
                    <React.Fragment key={tenant.uid}>
                        <ReactModal isOpen={isModalOpen} style={S.ModalStyles}>
                            <ModalHousehold
                                handleLeaveHousehold={handleLeaveHousehold}
                                isCurrentUser
                                onModalClose={() => setIsModalOpen(false)}
                            />
                        </ReactModal>

                        <S.Item>
                            <S.ProfilePhoto owner={tenant} width="50px" />
                            <S.Name isPending={isPending}>{isPending ? 'Pending' : tenant.name}</S.Name>
                            <S.Email>{tenant.email}</S.Email>
                            {getEmoji(tenant.houseRole)}

                            {!isAlexa && (
                                <S.MenuButton onClick={() => setIsModalOpen(true)}>
                                    <img src={threeDots} alt="menu" />
                                </S.MenuButton>
                            )}
                        </S.Item>
                    </React.Fragment>
                );
            })}
        </S.List>
    );
};
