import React, { createContext, FC, ReactNode, useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { firebase, db } from '../../services';
import { UserType } from '../../types';
import { formatUser } from './utils';

type ProviderAuthProps = {
    children: ReactNode;
};

type AuthContextTypes = {
    fetchUserData: (userId: string) => void;
    isAuthed?: boolean;
    isCheckingAuth: boolean;
    signOut: () => void;
    setUser: React.Dispatch<React.SetStateAction<Partial<UserType> | undefined>>;
    user?: Partial<UserType>;
};

export const AuthContext = createContext<AuthContextTypes>({
    fetchUserData: () => null,
    isCheckingAuth: true,
    setUser: () => null,
    signOut: () => null
});

export const ProviderAuth: FC<ProviderAuthProps> = ({ children }) => {
    const [user, setUser] = useState<Partial<UserType>>();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [isAuthed, setIsAuthed] = useState(false);
    const { state, redirect_uri } = useParams<{ state?: any; redirect_uri?: string }>();

    const fetchUserData = useCallback((uid: string) => {
        firebase
            .firestore()
            .collection('users')
            .doc(uid)
            .onSnapshot(
                (doc: any) => {
                    if (doc.exists) {
                        const formatted = formatUser(doc.data());

                        setIsAuthed(true);
                        setUser(formatted);
                    } else {
                        // doc.data() will be undefined in this case
                        console.log('No such document!');
                    }
                    setIsCheckingAuth(false);
                },
                (error) => {
                    setIsAuthed(false);
                    setIsCheckingAuth(false);
                    console.log('Error getting document:', error);
                }
            );
    }, []);

    const signOut = (): void => {
        firebase.auth().signOut();
        setIsAuthed(false);
        setUser(undefined);
    };

    // check current auth state and add firebase auth data to state
    useEffect(() => {
        firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                fetchUserData(firebaseUser.uid);

                const authCode = uuidv4();

                db.collection(`auth_codes`).doc(firebaseUser.uid).set(
                    {
                        code: authCode,
                        uid: firebaseUser.uid,
                        created: firebase.firestore.FieldValue.serverTimestamp()
                    },
                    { merge: true }
                );

                const urlParams = new URLSearchParams(window.location.search);
                // State sent by Alexa which we have to return.
                const state = urlParams.get('state');
                // Redirect uri sent by Alexa.
                const redirect_uri = urlParams.get('redirect_uri');

                if (redirect_uri) {
                    // Combine all the uri elements.
                    const url = redirect_uri + '?state=' + state + '&code=' + authCode;

                    // Redirect
                    window.location.href = url;
                }
            } else {
                setIsAuthed(false);
                setIsCheckingAuth(false);
            }
        });
    }, [fetchUserData, redirect_uri, state]);

    return (
        <AuthContext.Provider
            value={{
                fetchUserData,
                isAuthed,
                isCheckingAuth,
                signOut,
                setUser,
                user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
