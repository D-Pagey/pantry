import React, { useContext } from 'react';
import { FirebaseContext } from '../ProviderFirebase';

const PageProfile = (): JSX.Element => {
    const { signOut, user } = useContext(FirebaseContext);

    return (
        <div data-testid="pageProfile">
            <p>Welcome {user.name}</p>
            <p>Your email is: {user.email}</p>
            <button onClick={() => signOut()} data-testid="pageProfileButton">
                Sign Out
            </button>
        </div>
    );
};

export default PageProfile;
