import React, { FC, useContext } from 'react';
import { FirebaseContext } from '../ProviderFirebase';
import { Layout } from '../Layout';

export const PageProfile: FC = () => {
    const { signOut, user } = useContext(FirebaseContext);

    return (
        <Layout title="Profile">
            <div data-testid="pageProfile">
                <p>
                    Welcome
                    {user.name}
                </p>
                <p>
                    Your email is:
                    {user.email}
                </p>
                <button onClick={(): null => signOut()} data-testid="pageProfileButton" type="button">
                    Sign Out
                </button>
            </div>
        </Layout>
    );
};
