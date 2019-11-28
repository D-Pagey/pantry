import React from 'react';
import { bool, func } from 'prop-types';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Redirect } from 'react-router-dom';
import { firebase } from '../../services';

const PageSignIn = ({ isAuthed, setUser }) => {
    // Configure FirebaseUI.
    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        // signInSuccessUrl: '/signedIn',
        callbacks: {
            // Avoid redirects after sign-in.
            signInSuccessWithAuthResult: (result) =>
                setUser({ name: result.user.displayName, email: result.user.email })
        },
        // We will display Google and Facebook as auth providers.
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    };

    if (isAuthed) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
    );
};

PageSignIn.propTypes = {
    isAuthed: bool.isRequired,
    setUser: func.isRequired
};

export default PageSignIn;
