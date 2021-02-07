import React from 'react';

import { UserDan, Fridge, TenantHeidi, Categories } from '../../fixtures';
import { AuthContext } from '../ProviderAuth';
import { PageFood } from '.';

export default { title: 'PageFood' };

export const normal = () => (
    <AuthContext.Provider
        value={{
            fetchUserData: () => null,
            isAuthed: true,
            isCheckingAuth: false,
            setUser: () => null,
            signOut: () => null,
            user: UserDan
        }}
    >
        <PageFood fridge={Fridge} tenants={[TenantHeidi]} categories={Categories} />
    </AuthContext.Provider>
);
