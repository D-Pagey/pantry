import React from 'react';
import { User } from '../../fixtures';
import { AuthContext } from '../ProviderAuth';
import { PageSettings } from '.';

export default { title: 'PageSettings ' };

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
        <PageSettings />
    </AuthContext.Provider>
);
