import React, { FC } from 'react';

import { TenantType } from '../../types';
import * as S from './styles';

type HouseholdProps = {
    tenants: TenantType[];
};

export const Household: FC<HouseholdProps> = ({ tenants }) => (
    <S.List>
        {tenants.map((tenant) => (
            <S.Item key={tenant.uid}>
                <S.Image src={tenant.photo} alt="user" onError={(e: any) => console.log('shit balls', e)} />
                <S.Name>{tenant.name}</S.Name>
                <S.Email>{tenant.email}</S.Email>
                {tenant.houseRole === 'owner' ? (
                    // eslint-disable-next-line jsx-a11y/accessible-emoji
                    <S.Span role="img" aria-label="cool">
                        😎
                    </S.Span>
                ) : (
                    // eslint-disable-next-line jsx-a11y/accessible-emoji
                    <S.Span role="img" aria-label="smile">
                        😀
                    </S.Span>
                )}
                <S.HouseRole>{tenant.houseRole}</S.HouseRole>
            </S.Item>
        ))}
    </S.List>
);
