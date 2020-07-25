import React from 'react';

import { UnreadNotification, ReadNotification, User } from '../../fixtures';
import { AuthContext } from '../ProviderAuth';
import { Notifications } from '.';

export default { title: 'Notifications' };

export const normal = () => (
    <AuthContext.Provider
        value={{
            fetchUserData: () => {},
            isAuthed: true,
            isCheckingAuth: false,
            setUser: () => {},
            signOut: () => {},
            user: { ...User, notifications: [UnreadNotification, ReadNotification] }
        }}
    >
        <Notifications />
    </AuthContext.Provider>
);
