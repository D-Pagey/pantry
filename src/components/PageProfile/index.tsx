import React, { FC, useContext, useCallback, useEffect, useState } from 'react';
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
    fridgeUsers?: string[];
};

export const PageProfile: FC<PageProfileProps> = ({ fridgeUsers }) => {
    const [fridgeUsersInfo, setFridgeUsersInfo] = useState<UserType[]>();
    const [emailInvite, setEmailInvite] = useState('');
    const { signOut, user } = useContext(AuthContext);

    const handleNotificationClick = (itemUid: string, didAccept: boolean): void => {
        console.log({ didAccept, itemUid });
    };

    const notifyUserOfInvite = (userId: string) => {
        const notification: NotificationType = {
            createdAt: new Date(),
            description: `${user?.name} has invited you to join their household`,
            hasRead: false,
            inviterUid: user?.uid,
            type: 'invite',
            uid: uuidv4()
        };

        db.collection('users')
            .doc(userId)
            .update({ [`notifications.${uuidv4()}`]: notification })
            .then(() => toast.success(`${emailInvite} has been invited`))
            .catch(() => toast.error('Error with notifying the user'));
    };

    const handleInviteClick = () => {
        // does the email exist
        db.collection('users')
            .where('email', '==', emailInvite)
            .get()
            .then((querySnapshot) => {
                if (querySnapshot.empty) {
                    toast.error(`A user with the email ${emailInvite} doesn't exists.`);
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

    const fetchFridgeUsersInfo = useCallback(() => {
        db.collection('users')
            .where('uid', 'in', fridgeUsers)
            .get()
            .then((querySnapshot) => {
                const data: UserType[] = [];

                querySnapshot.forEach((doc) => {
                    data.push(doc.data() as UserType);
                });

                setFridgeUsersInfo(data);
            });
    }, [fridgeUsers]);

    useEffect(() => {
        if (!fridgeUsersInfo && fridgeUsers) fetchFridgeUsersInfo();
    }, [fridgeUsersInfo, fridgeUsers, fetchFridgeUsersInfo]);

    return (
        <Layout title="Profile">
            <S.Wrapper data-testid="pageProfile">
                {user && (
                    <>
                        <S.Image src={user.photo} alt="profile" />
                        <p>Welcome {user.name}</p>
                        <p>Your email is: {user.email}</p>

                        {user.notifications && (
                            <Notifications handleClick={handleNotificationClick} notifications={user.notifications} />
                        )}

                        <p>Your household consists of:</p>
                        {fridgeUsersInfo && <Friends friends={fridgeUsersInfo} />}

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
