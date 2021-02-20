import React, { createContext, FC, ReactNode, useState, useEffect, useCallback } from 'react';
import { firebase } from '../../services';
import { UserType } from '../../types';
import { Loading } from '../Loading';
import { formatUser } from './utils';

type ProviderAuthProps = {
    children: ReactNode;
};

type AuthContextTypes = {
    fetchUserData: (userId: string) => void;
    signOut: () => void;
    user?: UserType;
};

export const AuthContext = createContext<AuthContextTypes>({
    fetchUserData: () => null,
    signOut: () => null,
    user: undefined
});

export const ProviderAuth: FC<ProviderAuthProps> = ({ children }) => {
    const [user, setUser] = useState<UserType>();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    const fetchUserData = useCallback((uid: string) => {
        firebase
            .firestore()
            .collection('users')
            .doc(uid)
            .onSnapshot(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (doc: any) => {
                    if (doc.exists) {
                        const formatted = formatUser(doc.data());

                        setUser(formatted);
                    } else {
                        // doc.data() will be undefined in this case
                        console.log('No such document!');
                    }
                    setIsCheckingAuth(false);
                },
                (error) => {
                    setIsCheckingAuth(false);
                    console.log('Error getting document:', error);
                }
            );
    }, []);

    const signOut = (): void => {
        firebase.auth().signOut();
        setUser(undefined);
    };

    // check current auth state and add firebase auth data to state
    useEffect(() => {
        firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                fetchUserData(firebaseUser.uid);
            } else {
                setIsCheckingAuth(false);
            }
        });
    }, [fetchUserData]);

    if (isCheckingAuth) {
        return <Loading isLoading />;
    }

    return (
        <AuthContext.Provider
            value={{
                fetchUserData,
                signOut,
                user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
