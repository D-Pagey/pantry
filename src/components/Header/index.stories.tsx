import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { UnreadNotification, User, WelcomeNotification } from '../../fixtures';
import { AuthContext } from '../ProviderAuth';
import { Header } from '.';

export default { title: 'Header' };

export const normal = () => (
    <MemoryRouter>
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
            <Header />
        </AuthContext.Provider>
    </MemoryRouter>
);

// move to knobs

// export const withPageProps = () => (
//     <MemoryRouter>
//         <Header page="Add an item" />
//     </MemoryRouter>
// );
