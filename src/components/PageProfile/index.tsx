import React, { FC, useContext } from 'react';

import { FirebaseContext } from '../ProviderFirebase';
import { Layout } from '../Layout';
import { Button } from '../Button';
import * as S from './styles';

export const PageProfile: FC = () => {
    const { signOut, user } = useContext(FirebaseContext);

    return (
        <Layout title="Profile">
            <S.Wrapper data-testid="pageProfile">
                <S.Image src={user.photo} alt="profile" />
                <p>Welcome {user.name}</p>
                <p>Your email is: {user.email}</p>

                <Button onClick={(): null => signOut()} data-testid="pageProfileButton">
                    Sign Out
                </Button>
            </S.Wrapper>
        </Layout>
    );
};
