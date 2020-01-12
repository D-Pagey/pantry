import React, { useContext } from 'react';
import { FirebaseContext } from '../ProviderFirebase';

const PageProfile = (): JSX.Element => {
    const { categories, signOut, user } = useContext(FirebaseContext);

    return (
        <div data-testid="pageProfile">
            <p>Welcome {user.name}</p>
            <p>Your email is: {user.email}</p>
            <button onClick={() => signOut()} data-testid="pageProfileButton">
                Sign Out
            </button>

            <h2>Your Food Categories</h2>
            <ul>
                {categories.map((item: string) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default PageProfile;
