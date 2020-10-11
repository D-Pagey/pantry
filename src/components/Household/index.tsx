import React, { FC, useState } from 'react';
import ReactModal from 'react-modal';

import threeDots from '../../assets/three-dots.svg';
import { TenantType, HouseRoleType } from '../../types';
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
};

export const Household: FC<HouseholdProps> = ({ tenants }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const sortOrder: HouseRoleType[] = ['admin', 'tenant', 'alexa', 'pending'];

    const sortedTenants = [...tenants].sort((a, b) => {
        const aOrder = sortOrder.indexOf(a.houseRole);
        const bOrder = sortOrder.indexOf(b.houseRole);

        if (aOrder < bOrder) return -1;
        if (aOrder > bOrder) return 1;

        return 0;
    });

    return (
        <S.List>
            {sortedTenants.map((tenant) => {
                const isPending = tenant.houseRole === 'pending';

                return (
                    <>
                        <ReactModal isOpen={isModalOpen} style={S.ModalStyles}>
                            <ModalHousehold isAdmin onModalClose={() => setIsModalOpen(false)} />
                        </ReactModal>

                        <S.Item key={tenant.uid}>
                            <S.ProfilePhoto owner={tenant} width="50px" />
                            <S.Name isPending={isPending}>{isPending ? 'Pending' : tenant.name}</S.Name>
                            <S.Email>{tenant.email}</S.Email>
                            {getEmoji(tenant.houseRole)}

                            <S.MenuButton onClick={() => setIsModalOpen(true)}>
                                <img src={threeDots} alt="menu" />
                            </S.MenuButton>
                        </S.Item>
                    </>
                );
            })}
        </S.List>
    );
};
