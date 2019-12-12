import React, { createContext, useState, useEffect } from 'react';
import { node } from 'prop-types';
import { firebase } from '../../services';

export const AuthContext = createContext();

const ProviderAuth = ({ children }) => {
    const [user, setUser] = useState({});
    const [isAuthed, setIsAuthed] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                setIsAuthed(true);
                setUser({
                    name: user.providerData[0].displayName,
                    email: user.providerData[0].email,
                    photo: user.providerData[0].photoURL,
                    uid: user.uid
                });
            } else {
                setIsAuthed(false);
            }
        });
    }, []);

    useEffect(() => {
        if (user.uid && !user.household) {
            const getData = () => {
                firebase
                    .firestore()
                    .collection('users')
                    .doc(user.uid)
                    .get()
                    .then((doc) => {
                        if (doc.exists) {
                            setUser({ ...user, household: doc.data().household });
                        } else {
                            // doc.data() will be undefined in this case
                            console.log('No such document!');
                        }
                    })
                    .catch((error) => {
                        console.log('Error getting document:', error);
                    });
            };

            getData();
        }
    }, [user, user.uid]);

    return (
        <AuthContext.Provider value={{ isAuthed, setUser, setIsAuthed, user }}>
            {children}
        </AuthContext.Provider>
    );
};

ProviderAuth.propTypes = {
    children: node.isRequired
};

export default ProviderAuth;
