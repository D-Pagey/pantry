import React, { useContext } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Redirect } from 'react-router-dom';
import { firebase } from '../../services';
import { FirebaseContext } from '../ProviderFirebase';

const PageSignIn = () => {
    const { isAuthed, setUser } = useContext(FirebaseContext);

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
        <div data-testid="pageSignIn">
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
    );
};

export default PageSignIn;
