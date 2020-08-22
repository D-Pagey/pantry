import React, { FC, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import { TenantType, NotificationType } from '../../types';
import { db } from '../../services';
import { AuthContext } from '../ProviderAuth';
import { Layout } from '../Layout';
// import { Notifications } from '../Notifications';
import { Household } from '../Household';
import * as S from './styles';

type PageSettingsProps = {
    tenants: TenantType[];
};

export const PageSettings: FC<PageSettingsProps> = ({ tenants }) => {
    const [emailInvite, setEmailInvite] = useState('');
    const { signOut, user } = useContext(AuthContext);

    const notifyUserOfInvite = (userId: string) => {
        if (user?.household && user.uid) {
            const inviteNotificationUid = uuidv4();

            const notification: NotificationType = {
                createdAt: new Date(),
                description: `${user?.name} has invited you to join their household`,
                inviteData: {
                    inviterHouseholdId: user.household,
                    inviterUserId: user.uid
                },
                type: 'invite',
                uid: inviteNotificationUid
            };

            db.collection('users')
                .doc(userId)
                .update({ [`notifications.${inviteNotificationUid}`]: notification })
                .then(() => toast.success(`${emailInvite} has been invited`))
                .catch(() => toast.error('Error with notifying the user'));
        }
    };

    const handleInviteClick = () => {
        if (tenants.map((tenant) => tenant.email).includes(emailInvite)) {
            toast.error('That user is already in your household');
        } else {
            // does the email exist
            db.collection('users')
                .where('email', '==', emailInvite)
                .get()
                .then((querySnapshot) => {
                    if (querySnapshot.empty) {
                        toast.error(`A user with the email ${emailInvite} doesn't exist.`);
                    } else {
                        querySnapshot.forEach((doc) => {
                            notifyUserOfInvite(doc.data().uid);
                        });
                    }
                })
                .catch((error) => {
                    console.log('Error getting email user: ', error);
                });
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

                        {/* {user.notifications && user.uid && <Notifications />} */}

                        <S.SignOutButton destructive onClick={(): void => signOut()} data-testid="PageSettingsButton">
                            Sign Out
                        </S.SignOutButton>
                    </>
                )}
            </S.Wrapper>
        </Layout>
    );
};
