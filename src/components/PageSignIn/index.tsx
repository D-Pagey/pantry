import { FC, useState } from 'react';

import { analytics, firebase } from '../../services';
import { Layout } from '../Layout';
import { Input } from '../Input';
import loginImage from './assets/mobile-login.svg';
import * as S from './styles';

export const PageSignIn: FC = () => {
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const googleProvider = new firebase.auth.GoogleAuthProvider();

    const handleSignIn = () => {
        setIsLoading(true);

        firebase
            .auth()
            .signInWithPopup(googleProvider)
            .then(() => analytics.logEvent('login'))
            .catch(() => setIsLoading(false));
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    return (
        <Layout title="Sign in" isLoading={isLoading}>
            <S.Wrapper>
                <S.Image src={loginImage} alt="login" />

                {emailSent ? (
                    <p>A magic email sign-in email was sent to {email}</p>
                ) : (
                    <S.LoginWrapper>
                        <S.Title>Sign in to get started</S.Title>

                        <S.GoogleButton onClick={handleSignIn}>Continue With Google</S.GoogleButton>

                        <S.Text>or</S.Text>

                        <S.EmailWrapper>
                            <Input onChange={handleEmailChange} placeholder="Email me a magic link" value={email} />
                            <S.SendButton onClick={handleEmailClick}>Send</S.SendButton>
                        </S.EmailWrapper>
                    </S.LoginWrapper>
                )}
            </S.Wrapper>
        </Layout>
    );
};
