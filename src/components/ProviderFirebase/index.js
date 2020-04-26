import React, { createContext, useState, useEffect, useCallback } from 'react';
import { node } from 'prop-types';
import { toast } from 'react-toastify';
import { firebase } from '../../services';
import { updateCategoriesObject, countCategories, calculateExpiring } from './utils';

const db = firebase.firestore();
const HOUSEHOLDS = 'households';

export const FirebaseContext = createContext({
    addNewCategories: (values) => null,
    categories: [],
    deleteFoodItem: (id) => () => null,
    expiringCount: 0,
    isAuthed: false,
    isCheckingAuth: false,
    fridge: [],
    signOut: () => null,
    updateFridge: (values) => null,
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
    const [expiringCount, setExpiringCount] = useState();

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

    const getFridgeData = useCallback(() => {
        db.collection('households')
            .doc(user.household)
            .onSnapshot((doc) => {
                const data = doc.data();
                const fridgeData = Object.values(data.fridge);

                const formattedData = fridgeData.map((item) => ({
                    ...item,
                    expires: item.expires.toDate()
                }));

                const expiringId = Object.values(data.categories).find((item) => item.name === 'expiring').id;

                const { fridgeWithExpiring, count } = calculateExpiring(formattedData, expiringId);

                const countedCategories = countCategories(fridgeWithExpiring, data.categories);

                setFridge(fridgeWithExpiring);
                setCategories(countedCategories);
                setExpiringCount(count);
            });
    }, [user.household]);

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
            getFridgeData();
        }
    }, [getFridgeData, user.household]);

    const signOut = () => {
        firebase.auth().signOut();
        setIsAuthed(false);
        setUser({});
        setCategories([]);
        setFridge([]);
    };

    const updateFridge = (values) => {
        db.collection(HOUSEHOLDS)
            .doc(user.household)
            .update({ [`fridge.${values.id}`]: values })
            .then(() => {
                return toast.success('Food item added');
            })
            .catch(() => toast.error('Error with updating fridge'));
    };

    const addNewCategories = (categoryObjects) => {
        db.collection(HOUSEHOLDS)
            .doc(user.household)
            .update(updateCategoriesObject(categoryObjects))
            .then(() => toast.success('Category added'))
            .catch(() => toast.error('Error with updating categories'));
    };

    const deleteFoodItem = (id) => {
        db.collection(HOUSEHOLDS)
            .doc(user.household)
            .update({
                [`fridge.${id}`]: firebase.firestore.FieldValue.delete()
            })
            .then(() => {
                toast.error('Food deleted');
            })
            .catch(() => toast.error('Error with deleting food'));
    };

    return (
        <FirebaseContext.Provider
            value={{
                categories,
                expiringCount,
                fridge,
                deleteFoodItem,
                isAuthed,
                isCheckingAuth,
                setIsAuthed,
                setUser,
                signOut,
                addNewCategories,
                updateFridge,
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
