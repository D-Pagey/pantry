import React, { createContext, useState, useEffect, useCallback } from 'react';
import { node } from 'prop-types';
import { toast } from 'react-toastify';
import { firebase } from '../../services';
import { calculateExpiringSoon } from './utils';

const db = firebase.firestore();
const HOUSEHOLDS = 'households';

export const FirebaseContext = createContext({
    categories: [],
    expiringFood: [],
    isAuthed: false,
    isCheckingAuth: false,
    fridge: [],
    signOut: () => null,
    updateHousehold: ({ key, values, isDeleting }) => null,
    updateHousehold2: (values) => null,
    user: {
        email: null,
        name: null
    }
});

export const ProviderFirebase = ({ children }) => {
    const [user, setUser] = useState({});
    const [isAuthed, setIsAuthed] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [fridge, setFridge] = useState([]);
    const [categories, setCategories] = useState([]);
    const [expiringFood, setExpiringFood] = useState([]);

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
        firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                fetchUserData(firebaseUser.uid);
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
                        const data = doc.data();
                        const formattedData = data.fridge.map((item) => ({
                            ...item,
                            expires: item.expires.toDate()
                        }));
                        // TODO: this is shit need to refactor
                        setFridge(calculateExpiringSoon(formattedData));
                        setCategories(data.categories);
                        setExpiringFood(calculateExpiringSoon(formattedData).filter((item) => item.isExpiringSoon));
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
            .catch(() => toast.error('Error with updating fridge'));
    };

    const updateHousehold2 = (values) => {
        const categoryIds = values.categories.map((category) => category.id);

        const newCategories = values.categories.reduce((acc, curr) => {
            const incrementedCount = curr.count + 1;

            // eslint-disable-next-line no-underscore-dangle
            if (curr.__isNew__) {
                const { __isNew__, ...rest } = curr;

                return [...acc, { ...rest, count: incrementedCount }];
            }

            return [...acc, { ...curr, count: incrementedCount }];
        }, []);

        const notExistingCategories = categories.filter((category) => {
            // does this category id exist in values.cat
            return categoryIds.reduce((acc, curr) => {
                if (curr === category.id) {
                    return false;
                }

                return acc;
            }, true);
        });

        db.collection(HOUSEHOLDS)
            .doc(user.household)
            .update({
                categories: [...notExistingCategories, ...newCategories],
                fridge: [...fridge, { ...values, categories: categoryIds }]
            })
            .then(() => console.log('updated'))
            .catch(() => toast.error('Error with updating fridge'));
    };

    return (
        <FirebaseContext.Provider
            value={{
                categories,
                expiringFood,
                fridge,
                isAuthed,
                isCheckingAuth,
                setIsAuthed,
                setUser,
                signOut,
                updateHousehold,
                updateHousehold2,
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
