import React, { useContext } from 'react';
import { func } from 'prop-types';
import { AuthContext } from '../ProviderAuth';

type PageProfileTypes = {
    signOut: Function;
};

const PageProfile = ({ signOut }: PageProfileTypes): JSX.Element => {
    const { user } = useContext(AuthContext);

    return (
        <div data-testid="pageProfile">
            <p>Welcome {user.name}</p>
            <p>Your email is: {user.email}</p>
            <button onClick={() => signOut()}>Sign Out</button>
        </div>
    );
};

PageProfile.propTypes = {
    signOut: func.isRequired
};

export default PageProfile;
