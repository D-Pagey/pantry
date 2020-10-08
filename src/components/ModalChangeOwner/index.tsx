import React, { FC } from 'react';
import { TenantType } from '../../types';

import { getOwnerFromId } from '../../utils';
import { ProfilePhoto } from '../ProfilePhoto';
import * as S from './styles';

type ModalChangeOwnerTypes = {
    closeModal: () => void;
    handleChangeOwnerClick: (id: string) => () => void;
    ownerId: string;
    tenants: TenantType[];
};

export const ModalChangeOwner: FC<ModalChangeOwnerTypes> = ({ closeModal, handleChangeOwnerClick, ownerId, tenants }) => {
    return (
        <S.Wrapper>
            <h2>Change Owner</h2>
            <p>3 servings expiring in: 2 days</p>
            <p>Current Owner:</p>
            <ProfilePhoto owner={getOwnerFromId(ownerId, tenants)} width="50px" />
            <p>Click owner:</p>
            <ul>
                {tenants.map((tenant) => (
                    <li key={tenant.uid}>
                        <ProfilePhoto
                            onClick={handleChangeOwnerClick(tenant.uid)}
                            owner={getOwnerFromId(tenant.uid, tenants)}
                            width="50px"
                        />
                    </li>
                ))}
            </ul>

            <button onClick={closeModal} type="button">
                Close
            </button>
        </S.Wrapper>
    );
};
