import React from 'react';

import { UserDan, Fridge } from '../../fixtures';
import { AuthContext } from '../ProviderAuth';
import { PageFood } from '.';

export default { title: 'PageFood' };

export const normal = () => (
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
        <PageFood fridge={Fridge} />
    </AuthContext.Provider>
);
