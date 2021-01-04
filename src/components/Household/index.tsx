import React, { FC, useState } from 'react';
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';

import threeDots from '../../assets/three-dots.svg';
import { firebase } from '../../services';
import { TenantType, HouseRoleType, UserType } from '../../types';
import { ModalHousehold } from '../ModalHousehold';
import { getEmoji } from './utils';
import * as S from './styles';

export type HouseholdProps = {
    tenants: TenantType[];
    user: Partial<UserType>;
};

const leaveCurrentHousehold = firebase.functions().httpsCallable('leaveCurrentHousehold');
const cancelInvite = firebase.functions().httpsCallable('cancelInvite');

export const Household: FC<HouseholdProps> = ({ tenants, user }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTenant, setSelectedTenant] = useState<TenantType>();
    const currentUser = tenants.filter((tenant) => tenant.uid === user.uid)[0];

    const sortOrder: HouseRoleType[] = ['admin', 'tenant', 'alexa', 'pending'];

    const sortedTenants = [...tenants].sort((a, b) => {
        const aOrder = sortOrder.indexOf(a.houseRole);
        const bOrder = sortOrder.indexOf(b.houseRole);

        if (aOrder < bOrder) return -1;
        if (aOrder > bOrder) return 1;
        5;
        return 0;
    });

    const handleLeaveHousehold = async () => {
        const noPendingTenants = tenants.filter((tenant) => tenant.houseRole !== 'pending');

        // will need to change this when reintroducing Alexa as default tenant
        if (noPendingTenants.length === 1) {
            toast.error(`You can't leave as the only person in the household`);
        } else {
            const currentTenant = tenants.filter((tenant) => tenant.uid === user.uid)[0];

            try {
                const { data } = await leaveCurrentHousehold({ householdId: user.household, tenant: currentTenant });

                console.log({ data });
            } catch (error) {
                console.log({ error });
                toast.error('Something went wrong leaving, try again.');
            }
        }
        setIsModalOpen(false);
    };

    const handleCancelInvite = async () => {
        try {
            await cancelInvite({
                inviteeId: selectedTenant?.uid,
                householdId: user.household,
                inviterName: currentUser.name
            });

            toast.info('Invite cancelled');
            setIsModalOpen(false);
        } catch (error) {
            console.log({ error });
            toast.error('Something went wrong leaving, try again.');
        }
    };

    const handleMenuClick = (id: string) => () => {
        setSelectedTenant(tenants.filter((tenant) => tenant.uid === id)[0]);
        setIsModalOpen(true);
    };

    return (
        <>
            <ReactModal isOpen={isModalOpen} style={S.ModalStyles}>
                <ModalHousehold
                    handleCancelInvite={handleCancelInvite}
                    handleClose={() => setIsModalOpen(false)}
                    handleLeaveHousehold={handleLeaveHousehold}
                    handlePromoteUser={() => console.log('promote user')}
                    handleRemoveUser={() => console.log('remove user')}
                    showCancelOption={selectedTenant?.houseRole === 'pending'}
                    showLeaveOption={selectedTenant?.uid === user.uid}
                    showPromoteOption={
                        currentUser.houseRole === 'admin' &&
                        selectedTenant?.uid !== currentUser.uid &&
                        selectedTenant?.houseRole !== 'pending'
                    }
                    showRemoveOption={
                        currentUser.houseRole === 'admin' &&
                        selectedTenant?.uid !== currentUser.uid &&
                        selectedTenant?.houseRole !== 'pending'
                    }
                />
            </ReactModal>

            <S.List>
                {sortedTenants.map((tenant) => {
                    // const isAlexa = tenant.houseRole === 'alexa';
                    const isPending = tenant.houseRole === 'pending';
                    const currentUserIsAdmin = currentUser.houseRole === 'admin';
                    const showMenu = () => {
                        if (currentUserIsAdmin) return true;

                        if (currentUser.uid === tenant.uid) return true;

                        return false;
                    };

                    return (
                        <S.Item key={tenant.uid}>
                            <S.ProfilePhoto owner={tenant} width="50px" />
                            <S.Name isPending={isPending}>{isPending ? 'Pending' : tenant.name}</S.Name>
                            <S.Email>{tenant.email}</S.Email>
                            {getEmoji(tenant.houseRole)}

                            {showMenu() && (
                                <S.MenuButton onClick={handleMenuClick(tenant.uid)}>
                                    <img src={threeDots} alt="menu" />
                                </S.MenuButton>
                            )}
                        </S.Item>
                    );
                })}
            </S.List>
        </>
    );
};
