import { FC } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { UnreadNotification, UserDan, WelcomeNotification } from '../../fixtures';
import { AuthContext } from '../ProviderAuth';
import { Header } from '.';

export default { title: 'Header' };

export const normal: FC = () => (
    <MemoryRouter>
        <AuthContext.Provider
            value={{
                fetchUserData: () => null,
                signOut: () => null,
                user: { ...UserDan, notifications: [WelcomeNotification, UnreadNotification] }
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
