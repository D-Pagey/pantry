import React from 'react';

import { UnreadNotification, User, WelcomeNotification } from '../../fixtures';
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
            user: { ...User, notifications: [WelcomeNotification, UnreadNotification] }
        }}
    >
        <div style={{ margin: 32 }}>
            <Notifications />
        </div>
    </AuthContext.Provider>
);
