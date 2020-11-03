import React, { FC, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { TenantType } from '../../types';
import { firebase } from '../../services';
import { AuthContext } from '../ProviderAuth';
import { Layout } from '../Layout';
import { ProfilePhoto } from '../ProfilePhoto';
import { Household } from '../Household';
import { Button } from '../Button';
import * as S from './styles';

const inviteToHousehold = firebase.functions().httpsCallable('inviteToHousehold');

type PageSettingsProps = {
    tenants: TenantType[];
};

export const PageSettings: FC<PageSettingsProps> = ({ tenants }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [emailInvite, setEmailInvite] = useState('');
    const [notificationConsent, setNotificationConsent] = useState(false);
    const { signOut, user } = useContext(AuthContext);

    useEffect(() => {
        if (Notification.permission === 'granted') {
            setNotificationConsent(true);
        }
    }, []);

    const handleInviteClick = async () => {
        if (tenants.map((tenant) => tenant.email).includes(emailInvite)) {
            toast.error('That user is already in your household');
        } else {
            setIsLoading(true);

            try {
                const { data } = await inviteToHousehold({ email: emailInvite, householdId: user?.household });

                if (data.userExists && data.hasNotified) {
                    toast.success(`An invite was sent to ${emailInvite}`);
                } else {
                    toast.error(data.result);
                }

                setEmailInvite('');
            } catch (error) {
                toast.error('Error with notifying the user');
            }

            setIsLoading(false);
        }
    };

    const handleUserPermission = async () => {
        const consent = await Notification.requestPermission();

        if (consent === 'granted') {
            setNotificationConsent(true);
        } else {
            setNotificationConsent(false);
        }
    };

    return (
        <Layout title="Settings">
            <S.Wrapper data-testid="PageSettings">
                {user && (
                    <>
                        <ProfilePhoto owner={user} width="100px" />
                        <S.Name>Welcome {user.name}</S.Name>

                        <S.Heading>Notifications</S.Heading>
                        <S.Text>You have {!notificationConsent && 'not'} allowed push notifications</S.Text>
                        {!notificationConsent && <Button onClick={handleUserPermission}>Request Permission</Button>}

                        <S.Heading>Account Settings</S.Heading>
                        <S.Text>Your email is: {user.email}</S.Text>

                        <S.Heading>Household Settings</S.Heading>
                        <S.Text>Your household consists of:</S.Text>

                        <S.HouseholdWrapper>{user && <Household tenants={tenants} user={user} />}</S.HouseholdWrapper>

                        <S.Text>Invite someone to join your household:</S.Text>

                        <S.Input
                            disabled={isLoading}
                            onChange={(e: any) => setEmailInvite(e.target.value)}
                            placeholder="Your friends' email"
                            value={emailInvite}
                        />
                        <S.InviteButton isLoading={isLoading} onClick={handleInviteClick} loadingContent="Inviting">
                            Invite
                        </S.InviteButton>

                        <S.SignOutButton destructive onClick={(): void => signOut()} data-testid="PageSettingsButton">
                            Sign Out
                        </S.SignOutButton>
                    </>
                )}
            </S.Wrapper>
        </Layout>
    );
};
