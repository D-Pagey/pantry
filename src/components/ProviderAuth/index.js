import React, { createContext, useState, useEffect, useCallback } from 'react';
import { node } from 'prop-types';
import { firebase } from '../../services';

export const AuthContext = createContext();

const ProviderAuth = ({ children }) => {
    const [user, setUser] = useState({});
    const [isAuthed, setIsAuthed] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    const fetchUserData = useCallback((uid) => {
        firebase
            .firestore()
            .collection('users')
            .doc(uid)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    setIsAuthed(true);
                    setUser(doc.data());
                } else {
                    // doc.data() will be undefined in this case
                    console.log('No such document!');
                }
            })
            .catch((error) => {
                console.log('Error getting document:', error);
            });
    }, []);

    // check current auth state and add firebase auth data to state
    useEffect(() => {
        setIsCheckingAuth(true);

        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                fetchUserData(user.uid);
            } else {
                setIsAuthed(false);
            }

            setIsCheckingAuth(false);
        });
    }, [fetchUserData]);

    return (
        <AuthContext.Provider value={{ isAuthed, isCheckingAuth, setUser, setIsAuthed, user }}>
            {children}
        </AuthContext.Provider>
    );
};

ProviderAuth.propTypes = {
    children: node.isRequired
};

export default ProviderAuth;
