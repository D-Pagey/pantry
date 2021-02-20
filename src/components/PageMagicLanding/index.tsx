import React, { FC, useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { firebase } from '../../services';
import { AuthContext } from '../ProviderAuth';
import { Layout } from '../Layout';
import { Button } from '../Button';
import { Input } from '../Input';
import * as S from './styles';

export const PageMagicLanding: FC = () => {
    const [email, setEmail] = useState('');
    const [isMissingEmail, setIsMissingEmail] = useState(false);
    const [localEmail, setLocalEmail] = useState('');
    const [manualSubmit, setManualSubmit] = useState(false);
    const { user, fetchUserData } = useContext(AuthContext);

    useEffect(() => {
        // Confirm the link is a sign-in with email link.
        if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
            // Additional state parameters can also be passed via URL.
            // This can be used to continue the user's intended action before triggering
            // the sign-in operation.
            // Get the email if available. This should be available if the user completes
            // the flow on the same device where they started it.
            const localStorageEmail = window.localStorage.getItem('emailForSignIn');

            if (localStorageEmail) {
                setLocalEmail(localStorageEmail);
            } else {
                // User opened the link on a different device. To prevent session fixation
                // attacks, ask the user to provide the associated email again. For example:
                setIsMissingEmail(true);
            }
        }
    }, []);

    useEffect(() => {
        if (localEmail || manualSubmit) {
            // The client SDK will parse the code from the link for you.
            const emailToCheck = localEmail || email;

            firebase
                .auth()
                .signInWithEmailLink(emailToCheck, window.location.href)
                .then((result) => {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    fetchUserData(result.user!.uid);
                    // Clear email from storage.
                    window.localStorage.removeItem('emailForSignIn');
                    // You can access the new user via result.user
                    // Additional user info profile not available via:
                    // result.additionalUserInfo.profile == null
                    // You can check if the user is new or existing:
                    // result.additionalUserInfo.isNewUser
                })
                .catch((error) => {
                    console.log({ error });
                    // Some error occurred, you can inspect the code: error.code
                    // Common errors could be invalid email and invalid or expired OTPs.
                });
        }
    }, [localEmail, manualSubmit, email, fetchUserData]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleEmailChange = (event: any): void => setEmail(event.target.value);

    const handleEmailClick = (): void => setManualSubmit(true);

    if (user) {
        return <Redirect to="/food" />;
    }

    return (
        <Layout title="Magic Sign In">
            <S.Wrapper>
                <p>Magic Landing Page</p>

                {isMissingEmail && (
                    <S.EmailWrapper>
                        <Input
                            margin="0 2rem 0 0"
                            onChange={handleEmailChange}
                            placeholder="Email me a magic link"
                            value={email}
                        />
                        <Button onClick={handleEmailClick}>Send</Button>
                    </S.EmailWrapper>
                )}
            </S.Wrapper>
        </Layout>
    );
};
