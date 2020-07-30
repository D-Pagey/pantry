import React, { FC, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import { UserType, NotificationType } from '../../types';
import { db } from '../../services';
import { AuthContext } from '../ProviderAuth';
import { Layout } from '../Layout';
import { Notifications } from '../Notifications';
import { Button } from '../Button';
import { Input } from '../Input';
import { Friends } from '../Friends';
import * as S from './styles';

type PageProfileProps = {
    fridgeUsers: UserType[];
};

export const PageProfile: FC<PageProfileProps> = ({ fridgeUsers }) => {
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
    };

    return (
        <Layout title="Profile">
            <S.Wrapper data-testid="pageProfile">
                {user && (
                    <>
                        <S.Image src={user.photo} alt="profile" />
                        <p>Welcome {user.name}</p>
                        <p>Your email is: {user.email}</p>

                        {user.notifications && user.uid && <Notifications />}

                        <p>Your household consists of:</p>
                        <Friends friends={fridgeUsers} />

                        <p>Invite a friend to join your household</p>
                        <Input
                            onChange={(e) => setEmailInvite(e.target.value)}
                            placeholder="Your friends' email"
                            value={emailInvite}
                        />
                        <Button onClick={handleInviteClick}>Invite</Button>

                        <Button onClick={(): void => signOut()} data-testid="pageProfileButton">
                            Sign Out
                        </Button>
                    </>
                )}
            </S.Wrapper>
        </Layout>
    );
};
