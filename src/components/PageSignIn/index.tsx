import React, { FC, useContext, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Redirect } from 'react-router-dom';

import { firebase } from '../../services';
import { AuthContext } from '../ProviderAuth';
import { Layout } from '../Layout';
import { Input } from '../Input';
import { Button } from '../Button';
import loginImage from './assets/mobile-login.svg';
import * as S from './styles';

export const PageSignIn: FC = () => {
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const { isAuthed, setUser } = useContext(AuthContext);

    const handleEmailChange = (event: any): void => setEmail(event.target.value);

    // Configure FirebaseUI.
    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        // signInSuccessUrl: '/signedIn',
        callbacks: {
            // Avoid redirects after sign-in.
            signInSuccessWithAuthResult: (result: any): boolean => {
                setUser({ name: result.user.displayName, email: result.user.email, photo: result.user.photoURL });
                return false;
            }
        },
        // We will display Google and Facebook as auth providers.
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    };

    const actionCodeSettings = {
        url: `${process.env.REACT_APP_DOMAIN}/magic`,
        // This must be true.
        handleCodeInApp: true
    };

    const handleEmailClick = (): void => {
        firebase
            .auth()
            .sendSignInLinkToEmail(email, actionCodeSettings)
            .then(() => {
                // Save the email locally so you don't need to ask the user for it again
                // if they open the link on the same device.
                setEmailSent(true);
                window.localStorage.setItem('emailForSignIn', email);
            })
            .catch((error) => {
                console.log({ error });
                // Some error occurred, you can inspect the code: error.code
            });
    };

    if (isAuthed) {
        return <Redirect to="/food" />;
    }

    return (
        <Layout title="Sign in">
            <S.Wrapper>
                <S.Title>Who are you?</S.Title>

                {emailSent ? (
                    <p>A magic email sign-in email was sent to {email}</p>
                ) : (
                    <>
                        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />

                        <p>or</p>

                        <S.EmailWrapper>
                            <Input
                                margin="0 2rem 0 0"
                                onChange={handleEmailChange}
                                placeholder="Email me a magic link"
                                value={email}
                            />
                            <Button onClick={handleEmailClick}>Send</Button>
                        </S.EmailWrapper>
                    </>
                )}

                <S.Image src={loginImage} alt="login" />
            </S.Wrapper>
        </Layout>
    );
};
