import React, { createContext } from 'react';
import { node } from 'prop-types';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { db } from '../../services';

export const FirebaseContext = createContext();

const HOUSEHOLDS = 'households';
const MY_HOUSEHOLD = 'jc1508HlXno2nr7MmKBP';

const updateFridge = (values) => {
    db.collection(HOUSEHOLDS)
        .doc(MY_HOUSEHOLD)
        .update({ fridge: values })
        .then(() => console.log('Successfully updated fridge!'))
        .catch((error) => console.error('Error adding to fridge: ', error));
};

const ProviderFirebase = ({ children }) => {
    const [householdData, loading, error] = useDocumentData(
        db.collection(HOUSEHOLDS).doc(MY_HOUSEHOLD),
        {
            snapshotListenOptions: { includeMetadataChanges: true }
        }
    );

    const fridgeData =
        householdData &&
        householdData.fridge.map((item) => ({
            ...item,
            expires: item.expires.toDate()
        }));

    return (
        <FirebaseContext.Provider value={{ fridge: fridgeData, loading, error, updateFridge }}>
            {children}
        </FirebaseContext.Provider>
    );
};

ProviderFirebase.propTypes = {
    children: node.isRequired
};

export default ProviderFirebase;
