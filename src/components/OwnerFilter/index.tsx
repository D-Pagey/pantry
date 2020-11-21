import React, { FC } from 'react';
import { TenantType } from '../../types';
import * as S from './styles';

export type OwnerFilterProps = {
    tenants: TenantType[];
    selectedTenants: string[];
    setSelectedTenants: (uid: string) => void;
};

export const OwnerFilter: FC<OwnerFilterProps> = ({ tenants, selectedTenants, setSelectedTenants }) => {
    const handleClick = (uid: string) => () => setSelectedTenants(uid);

    return (
        <S.Wrapper>
            <span>Filter: </span>

            <S.List>
                {tenants.map((tenant) => (
                    <S.Button key={tenant.uid} onClick={handleClick(tenant.uid)}>
                        <S.Image
                            src={tenant.photo}
                            alt={tenant.name}
                            isSelected={selectedTenants.includes(tenant.uid)}
                        />
                    </S.Button>
                ))}
            </S.List>

            <S.ClearButton>Clear Filter</S.ClearButton>
        </S.Wrapper>
    );
};
