import React, { FC, useContext } from 'react';

import { AuthContext } from '../ProviderAuth';
import { Layout } from '../Layout';
import { Notifications } from '../Notifications';
import { Button } from '../Button';
import * as S from './styles';

import { UnreadNotification, ReadNotification } from '../../fixtures';

const fakeNotifications = [UnreadNotification, ReadNotification, UnreadNotification, ReadNotification];

export const PageProfile: FC = () => {
    const { signOut, user } = useContext(AuthContext);

    const handleNotificationClick = (itemUid: string, didAccept: boolean): void => {
        console.log({ didAccept, itemUid });
    };

    return (
        <Layout title="Profile">
            <S.Wrapper data-testid="pageProfile">
                {user && (
                    <>
                        <S.Image src={user.photo} alt="profile" />
                        <p>Welcome {user.name}</p>
                        <p>Your email is: {user.email}</p>

                        <Notifications handleClick={handleNotificationClick} notifications={fakeNotifications} />

                        <Button onClick={(): void => signOut()} data-testid="pageProfileButton">
                            Sign Out
                        </Button>
                    </>
                )}
            </S.Wrapper>
        </Layout>
    );
};
