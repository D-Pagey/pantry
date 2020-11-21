import React, { FC } from 'react';
import { TenantType } from '../../types';
import * as S from './styles';

export type OwnerFilterProps = {
    tenants: TenantType[];
    selectedTenants: string[];
    setSelectedTenants: (uid: string[]) => void;
};

export const OwnerFilter: FC<OwnerFilterProps> = ({ tenants, selectedTenants, setSelectedTenants }) => {
    const noneSelected = selectedTenants.length === 0;

    const handleClick = (uid: string) => () => {
        if (selectedTenants.includes(uid)) {
            setSelectedTenants(selectedTenants.filter((tenant) => tenant !== uid));
        } else {
            setSelectedTenants([...selectedTenants, uid]);
        }
    };

    const handleReset = () => {
        if (noneSelected) return;

        setSelectedTenants([]);
    };

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

            <S.ClearButton onClick={handleReset} disabled={noneSelected}>
                Clear Filter
            </S.ClearButton>
        </S.Wrapper>
    );
};
