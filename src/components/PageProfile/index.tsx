import React from 'react';
import { string, bool } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { firebase } from '../../services';

type ProfileTypes = {
    email: string;
    isAuthed: boolean;
    name: string;
};

const PageProfile = ({ email, isAuthed, name }: ProfileTypes): JSX.Element => {
    const signOut = () => firebase.auth().signOut();

    if (!isAuthed) return <Redirect to="/" />;

    return (
        <div>
            <p>Welcome {name}</p>
            <p>Your email is: {email}</p>
            <button onClick={signOut}>Sign Out</button>
        </div>
    );
};

PageProfile.propTypes = {
    email: string.isRequired,
    isAuthed: bool.isRequired,
    name: string.isRequired
};

export default PageProfile;
