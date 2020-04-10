import React, {
  createContext, useState, useEffect, useCallback,
} from 'react';
import { node } from 'prop-types';
import { toast } from 'react-toastify';
import { firebase } from '../../services';
import { updateCategoriesObject } from './utils';

const db = firebase.firestore();
const HOUSEHOLDS = 'households';

export const FirebaseContext = createContext({
  categories: [],
  isAuthed: false,
  isCheckingAuth: false,
  fridge: [],
  signOut: () => null,
  updateCategories: (values) => null,
  updateFridge: (values) => null,
  user: {
    email: null,
    name: null,
  },
});

export const ProviderFirebase = ({ children }) => {
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
            const formattedData = Object.values(data.fridge).map((item) => ({
              ...item,
              expires: item.expires.toDate(),
            }));
            // TODO: this is shit need to refactor
            setFridge(formattedData);
            setCategories([...Object.values(data.categories).map(item => ({...item, count: 0}))]);
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

  const updateFridge = (
    values, isEditMode, isDeleting,
  ) => {
    db.collection(HOUSEHOLDS)
      .doc(user.household)
      .update({ [`fridge.${values.id}`]: values })
      .then(() => {
        if (isDeleting) {
          return toast.info('Food item deleted.');
        }

        return toast.success(`Food item ${isEditMode ? 'edited' : 'added'}.`);
      })
      .catch(() => toast.error('Error with updating fridge'));
  };

  const updateCategories = (categoryObjects) => {
    db.collection(HOUSEHOLDS)
    .doc(user.household)
    .update(updateCategoriesObject(categoryObjects))
    .then(() => toast.success('Category added'))
    .catch(() => toast.error('Error with updating categories'));
  };

  return (
    <FirebaseContext.Provider
      value={{
        categories,
        fridge,
        isAuthed,
        isCheckingAuth,
        setIsAuthed,
        setUser,
        signOut,
        updateCategories,
        updateFridge,
        user,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

ProviderFirebase.propTypes = {
  children: node.isRequired,
};


