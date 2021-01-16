import React, { FC } from 'react';
import { TenantType } from '../../types';

import { getOwnerFromId } from '../../utils';
import { ProfilePhoto } from '../ProfilePhoto';
import { Button } from '../Button';
import * as S from './styles';

type ModalChangeOwnerTypes = {
    closeModal: () => void;
    handleChangeOwnerClick: (id: string) => () => void;
    ownerId: string;
    tenants: TenantType[];
};

export const ModalChangeOwner: FC<ModalChangeOwnerTypes> = ({
    closeModal,
    handleChangeOwnerClick,
    ownerId,
    tenants
}) => {
    const currentOwner = getOwnerFromId(ownerId, tenants);

    return (
        <S.Wrapper data-testid="modalChangeOwner">
            <h2>Change Owner</h2>
            <p>3 servings expiring in: 2 days</p>
            <p>Current Owner:</p>
            <ProfilePhoto
                name={currentOwner.name}
                email={currentOwner.email!}
                photo={currentOwner.photo}
                width="50px"
            />
            {currentOwner.name}
            <p>Click owner:</p>
            <S.List>
                {tenants.map((tenant) => {
                    const currentOwner = getOwnerFromId(tenant.uid, tenants);
                    return (
                        <li key={tenant.uid}>
                            <ProfilePhoto
                                email={currentOwner.email!}
                                name={currentOwner.name}
                                photo={currentOwner.photo}
                                onClick={handleChangeOwnerClick(tenant.uid)}
                                width="50px"
                            />
                            <p>{tenant.name}</p>
                        </li>
                    );
                })}
            </S.List>

            <Button secondary onClick={closeModal}>
                Close
            </Button>
        </S.Wrapper>
    );
};
