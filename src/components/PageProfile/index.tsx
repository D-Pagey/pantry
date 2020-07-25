import React, { FC, useContext, useCallback, useEffect, useState } from 'react';

import { UserType } from '../../types';
import { db } from '../../services';
import { AuthContext } from '../ProviderAuth';
import { Layout } from '../Layout';
import { Notifications } from '../Notifications';
import { Button } from '../Button';
import { Friends } from '../Friends';
import * as S from './styles';

type PageProfileProps = {
    fridgeUsers?: string[];
};

export const PageProfile: FC<PageProfileProps> = ({ fridgeUsers }) => {
    const [fridgeUsersInfo, setFridgeUsersInfo] = useState<UserType[]>();
    const { signOut, user } = useContext(AuthContext);

    const handleNotificationClick = (itemUid: string, didAccept: boolean): void => {
        console.log({ didAccept, itemUid });
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

                        <Button onClick={(): void => signOut()} data-testid="pageProfileButton">
                            Sign Out
                        </Button>
                    </>
                )}
            </S.Wrapper>
        </Layout>
    );
};
