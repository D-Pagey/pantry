import React, { createContext, useState, useEffect, useCallback } from 'react';
import { node } from 'prop-types';
import { toast } from 'react-toastify';
import { firebase } from '../../services';
import { countCategories } from './utils';

const db = firebase.firestore();
const HOUSEHOLDS = 'households';

export const FirebaseContext = createContext({
    categories: [],
    categoryCounts: [],
    isAuthed: false,
    isCheckingAuth: false,
    fridge: [],
    signOut: () => null,
    updateHousehold: ({ key, values, isDeleting }) => null,
    user: {
        email: null,
        name: null
    }
});

const ProviderFirebase = ({ children }) => {
    const [user, setUser] = useState({});
    const [isAuthed, setIsAuthed] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [fridge, setFridge] = useState([]);
    const [categories, setCategories] = useState([]);

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
                setIsCheckingAuth(false);
            })
            .catch((error) => {
                setIsAuthed(false);
                setIsCheckingAuth(false);
                console.log('Error getting document:', error);
            });
    }, []);

    // check current auth state and add firebase auth data to state
    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                fetchUserData(user.uid);
            } else {
                setIsAuthed(false);
                setIsCheckingAuth(false);
            }
        });
    }, [fetchUserData]);

    useEffect(() => {
        if (user.household) {
            const getData = () => {
                db.collection('households')
                    .doc(user.household)
                    .onSnapshot((doc) => {
                        setFridge(
                            doc.data().fridge.map((item) => ({
                                ...item,
                                expires: item.expires.toDate()
                            }))
                        );
                        setCategories(doc.data().categories);
                    });
            };

            getData();
        }
    }, [user.household]);

    const signOut = () => {
        firebase.auth().signOut();
        setIsAuthed(false);
        setUser({});
        setCategories([]);
        setFridge([]);
    };

    const updateHousehold = ({ key, values, isEditMode, isDeleting }) => {
        db.collection(HOUSEHOLDS)
            .doc(user.household)
            .update({ [key]: values })
            .then(() => {
                if (isDeleting) {
                    return toast.info('Food item deleted.');
                }

                return toast.success(`Food item ${isEditMode ? 'edited' : 'added'}.`);
            })
            .catch((error) => toast.error('Error with updating fridge'));
    };

    return (
        <FirebaseContext.Provider
            value={{
                isAuthed,
                isCheckingAuth,
                categories,
                categoryCounts: countCategories(fridge.map((item) => item.category)),
                fridge,
                setIsAuthed,
                setUser,
                signOut,
                updateHousehold,
                user
            }}
        >
            {children}
        </FirebaseContext.Provider>
    );
};

ProviderFirebase.propTypes = {
    children: node.isRequired
};

export default ProviderFirebase;
