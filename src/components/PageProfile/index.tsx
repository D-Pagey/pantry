import React, { useContext } from 'react';
import { func } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../ProviderAuth';

type PageProfileTypes = {
    signOut: Function;
};

const PageProfile = ({ signOut }: PageProfileTypes): JSX.Element => {
    const { isAuthed, user } = useContext(AuthContext);

    if (!isAuthed) return <Redirect to="/" />;

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
