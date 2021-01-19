import React, { FC, useState } from 'react';
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';

import threeDots from '../../assets/three-dots.svg';
import { firebase } from '../../services';
import { TenantType, UserType } from '../../types';
import { ModalHousehold } from '../ModalHousehold';
import { getSortedTenants } from './utils';
import { Emoji } from './Emoji';
import * as S from './styles';

export type HouseholdProps = {
    tenants: TenantType[];
    user: Partial<UserType>;
};

const leaveCurrentHousehold = firebase.functions().httpsCallable('leaveCurrentHousehold');
const cancelInvite = firebase.functions().httpsCallable('cancelInvite');
const removeUser = firebase.functions().httpsCallable('removeUserFromHousehold');
const promoteUser = firebase.functions().httpsCallable('promoteUser');

export const Household: FC<HouseholdProps> = ({ tenants, user }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTenant, setSelectedTenant] = useState<TenantType>();
    const currentUser = tenants.filter((tenant) => tenant.uid === user.uid)[0];

    const handleLeaveHousehold = async () => {
        const noPendingTenants = tenants.filter((tenant) => tenant.houseRole !== 'pending');

        // will need to change this when reintroducing Alexa as default tenant
        if (noPendingTenants.length === 1) {
            toast.error(`You can't leave as the only person in the household`);
        } else {
            setIsLoading(true);
            const currentTenant = tenants.filter((tenant) => tenant.uid === user.uid)[0];

            try {
                await leaveCurrentHousehold({ householdId: user.household, tenant: currentTenant });
            } catch (error) {
                toast.error('Something went wrong leaving, try again.');
            }
        }
        setIsModalOpen(false);
    };

    const handleCancelInvite = async () => {
        setIsLoading(true);
        try {
            await cancelInvite({
                inviteeId: selectedTenant?.uid,
                householdId: user.household,
                inviterName: currentUser.name
            });

            toast.info('Invite cancelled');
            setIsModalOpen(false);
        } catch (error) {
            toast.error('Something went wrong leaving, try again.');
        }
    };

    const handleRemoveUser = async () => {
        setIsLoading(true);
        try {
            await removeUser({
                householdId: user.household,
                tenant: selectedTenant
            });

            setIsModalOpen(false);
        } catch (error) {
            toast.error('Something went wrong removing user, try again.');
        }
    };

    const handlePromoteUser = async () => {
        setIsLoading(true);
        try {
            await promoteUser({
                householdId: user.household,
                tenant: selectedTenant
            });

            setIsModalOpen(false);
        } catch (error) {
            toast.error('Something went wrong promoting user, try again.');
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
                    handlePromoteUser={handlePromoteUser}
                    handleRemoveUser={handleRemoveUser}
                    loading={isLoading}
                    showCancelOption={selectedTenant?.houseRole === 'pending'}
                    showLeaveOption={selectedTenant?.uid === user.uid}
                    showPromoteOption={
                        currentUser.houseRole === 'admin' &&
                        selectedTenant?.uid !== currentUser.uid &&
                        selectedTenant?.houseRole !== 'pending' &&
                        selectedTenant?.houseRole !== 'admin'
                    }
                    showRemoveOption={
                        currentUser.houseRole === 'admin' &&
                        selectedTenant?.uid !== currentUser.uid &&
                        selectedTenant?.houseRole !== 'pending' &&
                        selectedTenant?.houseRole !== 'admin'
                    }
                />
            </ReactModal>

            <S.List>
                {getSortedTenants(tenants).map((tenant) => {
                    // const isAlexa = tenant.houseRole === 'alexa';
                    const isPending = tenant.houseRole === 'pending';
                    const showMenu = () => {
                        const admins = tenants.filter((tenant) => tenant.houseRole === 'admin');
                        const otherAdmins = admins.reduce((acc, curr) => {
                            if (curr.uid === user.uid) return acc;

                            return [...acc, curr.uid];
                        }, [] as string[]);

                        if (otherAdmins.includes(tenant.uid)) return false;
                        if (currentUser.houseRole === 'admin') return true;
                        if (currentUser.uid === tenant.uid) return true;

                        return false;
                    };

                    return (
                        <S.Item key={tenant.uid}>
                            <S.ProfilePhoto email={tenant.email} name={tenant.name} photo={tenant.photo} width="50px" />
                            <S.Name isPending={isPending}>{isPending ? 'Pending' : tenant.name}</S.Name>
                            <S.Email>{tenant.email}</S.Email>
                            <Emoji houseRole={tenant.houseRole} />

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
