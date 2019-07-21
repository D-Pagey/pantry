import React, { createContext } from 'react';
import { node } from 'prop-types';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../services';

export const FirebaseContext = createContext();

const addDoc = (values) => {
    db.collection('test')
        .add(values)
        .then(() => console.log('Document successfully written!'))
        .catch((error) => console.error('Error writing document: ', error));
};

const deleteDoc = (id) => {
    db.collection('test')
        .doc(id)
        .delete()
        .then(() => console.log('Document successfully deleted!'))
        .catch((error) => console.error('Error deleting document: ', error));
};

const ProviderFirebase = ({ children }) => {
    const [value, loading, error] = useCollection(db.collection('test'), {
        snapshotListenOptions: { includeMetadataChanges: true }
    });

    return (
        <FirebaseContext.Provider value={{ value, loading, error, addDoc, deleteDoc }}>
            {children}
        </FirebaseContext.Provider>
    );
};

ProviderFirebase.propTypes = {
    children: node.isRequired
};

export default ProviderFirebase;
