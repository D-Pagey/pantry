import React, { FC } from 'react';

import threeDots from '../../assets/three-dots.svg';
import { TenantType, HouseRoleType } from '../../types';
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
    return (
        <S.List>
            {tenants.map((tenant) => {
                const isPending = tenant.houseRole === 'pending';

                return (
                    <S.Item key={tenant.uid}>
                        <S.ProfilePhoto owner={tenant} width="50px" />
                        <S.Name isPending={isPending}>{isPending ? 'Pending' : tenant.name}</S.Name>
                        <S.Email>{tenant.email}</S.Email>
                        {getEmoji(tenant.houseRole)}

                        <S.MenuButton>
                            <img src={threeDots} alt="menu" />
                        </S.MenuButton>
                    </S.Item>
                );
            })}
        </S.List>
    );
};
