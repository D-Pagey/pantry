import React from 'react';
import { UserDan, TenantHeidi } from '../../fixtures';
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
            user: UserDan
        }}
    >
        <PageSettings tenants={[TenantHeidi]} />
    </AuthContext.Provider>
);
