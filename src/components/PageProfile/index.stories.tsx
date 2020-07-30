import React from 'react';
import { User } from '../../fixtures';
import { AuthContext } from '../ProviderAuth';
import { PageProfile } from '.';

export default { title: 'PageProfle ' };

export const normal = (): JSX.Element => (
    <AuthContext.Provider
        value={{
            fetchUserData: () => {},
            isAuthed: true,
            isCheckingAuth: false,
            setUser: () => {},
            signOut: () => {},
            user: User
        }}
    >
        <PageProfile fridgeUsers={[User]} />
    </AuthContext.Provider>
);
