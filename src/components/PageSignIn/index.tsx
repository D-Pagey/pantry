import React, { FC, useContext, useState } from 'react';
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
    const [isLoading, setIsLoading] = useState(false);
    const { isAuthed } = useContext(AuthContext);

    const googleProvider = new firebase.auth.GoogleAuthProvider();

    const handleSignIn = () => {
        setIsLoading(true);

        firebase
            .auth()
            .signInWithPopup(googleProvider)
            .then((result) => null)
            .catch((error) => {
                setIsLoading(false);
            });
    };

    const handleEmailChange = (event: any): void => setEmail(event.target.value);

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
        <Layout title="Sign in" isLoading={isLoading}>
            <S.Wrapper>
                <S.Title>Who are you?</S.Title>

                {emailSent ? (
                    <p>A magic email sign-in email was sent to {email}</p>
                ) : (
                    <>
                        <S.GoogleButton onClick={handleSignIn}>Sign In With Google</S.GoogleButton>

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
