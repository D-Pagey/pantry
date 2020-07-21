import React, { FC, useContext } from 'react';

import { AuthContext } from '../ProviderAuth';
import { Layout } from '../Layout';
import { Button } from '../Button';
import * as S from './styles';

const households = [
    { label: 'Default', value: 'aaabbbccc' },
    { label: 'Heidi house', value: '123' }
];

export const PageProfile: FC = () => {
    const { signOut, user } = useContext(AuthContext);

    return (
        <Layout title="Profile">
            <S.Wrapper data-testid="pageProfile">
                {user && (
                    <>
                        <S.Image src={user.photo} alt="profile" />
                        <p>Welcome {user.name}</p>
                        <p>Your email is: {user.email}</p>

                        <S.HouseholdWrapper>
                            <p>Your households:</p>
                            <S.Dropdown options={households} />
                        </S.HouseholdWrapper>

                        <Button onClick={(): void => signOut()} data-testid="pageProfileButton">
                            Sign Out
                        </Button>
                    </>
                )}
            </S.Wrapper>
        </Layout>
    );
};
