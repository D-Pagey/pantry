import React, { createContext } from 'react';
import { node } from 'prop-types';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { db } from '../../services';

export const FirebaseContext = createContext();

const HOUSEHOLDS = 'households';
const MY_HOUSEHOLD = 'jc1508HlXno2nr7MmKBP';

const addDoc = (values) => {
    db.collection(HOUSEHOLDS)
        .add(values)
        .then(() => console.log('Document successfully written!'))
        .catch((error) => console.error('Error writing document: ', error));
};

const deleteDoc = (id) => {
    db.collection(HOUSEHOLDS)
        .doc(id)
        .delete()
        .then(() => console.log('Document successfully deleted!'))
        .catch((error) => console.error('Error deleting document: ', error));
};

const ProviderFirebase = ({ children }) => {
    const [value, loading, error] = useDocumentData(db.collection(HOUSEHOLDS).doc(MY_HOUSEHOLD), {
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
