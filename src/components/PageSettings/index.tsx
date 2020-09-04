import React, { FC, useContext, useState } from 'react';
import { toast } from 'react-toastify';

import { TenantType } from '../../types';
import { firebase } from '../../services';
import { AuthContext } from '../ProviderAuth';
import { Layout } from '../Layout';
import { Household } from '../Household';
import * as S from './styles';

const inviteToHousehold = firebase.functions().httpsCallable('inviteToHousehold');

type PageSettingsProps = {
    tenants: TenantType[];
};

export const PageSettings: FC<PageSettingsProps> = ({ tenants }) => {
    const [emailInvite, setEmailInvite] = useState('');
    const { signOut, user } = useContext(AuthContext);

    const handleInviteClick = async () => {
        if (tenants.map((tenant) => tenant.email).includes(emailInvite)) {
            toast.error('That user is already in your household');
        } else {
            try {
                const { data } = await inviteToHousehold({ email: emailInvite });

                if (data.userExists && data.hasNotified) {
                    toast.success(`An invite was sent to ${emailInvite}`);
                } else {
                    toast.error('Something went wrong');
                }

                setEmailInvite('');
            } catch (error) {
                toast.error('Error with notifying the user');
            }
        }
    };

    return (
        <Layout title="Settings">
            <S.Wrapper data-testid="PageSettings">
                {user && (
                    <>
                        <S.Image src={user.photo} alt="profile" />
                        <S.Name>Welcome {user.name}</S.Name>

                        <S.Heading>Account Settings</S.Heading>
                        <S.Text>Your email is: {user.email}</S.Text>

                        <S.Heading>Household Settings</S.Heading>
                        <S.Text>Your household consists of:</S.Text>

                        <S.HouseholdWrapper>
                            <Household tenants={tenants} />
                        </S.HouseholdWrapper>

                        <S.Text>Invite someone to join your household:</S.Text>

                        <S.Input
                            onChange={(e: any) => setEmailInvite(e.target.value)}
                            placeholder="Your friends' email"
                            value={emailInvite}
                        />
                        <S.InviteButton onClick={handleInviteClick}>Invite</S.InviteButton>

                        <S.SignOutButton destructive onClick={(): void => signOut()} data-testid="PageSettingsButton">
                            Sign Out
                        </S.SignOutButton>
                    </>
                )}
            </S.Wrapper>
        </Layout>
    );
};
