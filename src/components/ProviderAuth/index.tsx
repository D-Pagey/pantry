import React, { createContext, FC, ReactNode, useState, useEffect, useCallback } from 'react';
import { firebase } from '../../services';
import { UserType } from '../../types';

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
    fetchUserData: () => {},
    isCheckingAuth: true,
    setUser: () => {},
    signOut: () => {}
});

export const ProviderAuth: FC<ProviderAuthProps> = ({ children }) => {
    const [user, setUser] = useState<Partial<UserType>>();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [isAuthed, setIsAuthed] = useState(false);

    const fetchUserData = useCallback((uid: string) => {
        firebase
            .firestore()
            .collection('users')
            .doc(uid)
            .get()
            .then((doc: any) => {
                if (doc.exists) {
                    setIsAuthed(true);
                    setUser(doc.data());
                } else {
                    // doc.data() will be undefined in this case
                    console.log('No such document!');
                }
                setIsCheckingAuth(false);
            })
            .catch((error) => {
                setIsAuthed(false);
                setIsCheckingAuth(false);
                console.log('Error getting document:', error);
            });
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
            } else {
                setIsAuthed(false);
                setIsCheckingAuth(false);
            }
        });
    }, [fetchUserData]);

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
