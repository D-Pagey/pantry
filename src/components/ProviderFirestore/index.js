import React, { createContext } from 'react';
import { node } from 'prop-types';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { firebase } from '../../services';

const db = firebase.firestore();

export const FirestoreContext = createContext();

const HOUSEHOLDS = 'households';
const MY_HOUSEHOLD = 'jc1508HlXno2nr7MmKBP';

const updateFridge = (values) => {
    db.collection(HOUSEHOLDS)
        .doc(MY_HOUSEHOLD)
        .update({ fridge: values })
        .then(() => console.log('Successfully updated fridge!'))
        .catch((error) => console.error('Error adding to fridge: ', error));
};

const updateCategories = (categories) => {
    db.collection(HOUSEHOLDS)
        .doc(MY_HOUSEHOLD)
        .update({ categories })
        .then(() => console.log('Successfully updated categories!'))
        .catch((error) => console.error('Error adding to categories: ', error));
};

/** checkIndex function
 * @param {array} array an array of objects with category and count keys
 * @param {string} label a string of what to check in the category key
 */
export const checkIndex = (array, category) => {
    return array.reduce((acc, cur, index) => {
        if (cur.category === category) return index;
        return acc;
    }, -1);
};

/** countCategories function
 * @param {array} categories an array of category objects with label and value keys
 */
export const countCategories = (categories) => {
    const reducedCategories = categories.reduce((acc, curr) => {
        const index = checkIndex(acc, curr);

        if (index === -1) {
            acc.push({ category: curr, count: 1 });
        } else {
            const newAcc = [...acc];
            newAcc[index].count += 1;
            return newAcc;
        }

        return acc;
    }, []);

    reducedCategories.push({ category: 'all', count: categories.length });

    return reducedCategories;
};

const ProviderFirebase = ({ children }) => {
    const [householdData, loading, error] = useDocumentData(
        db.collection(HOUSEHOLDS).doc(MY_HOUSEHOLD),
        {
            snapshotListenOptions: { includeMetadataChanges: true }
        }
    );

    const foodCategories = householdData ? householdData.categories : [];

    const fridgeData = householdData
        ? householdData.fridge.map((item) => ({
              ...item,
              expires: item.expires.toDate()
          }))
        : [];

    const categoryCounts = fridgeData && countCategories(fridgeData.map((item) => item.category));

    return (
        <FirestoreContext.Provider
            value={{
                categoryCounts,
                error,
                foodCategories,
                fridge: fridgeData,
                loading,
                updateCategories,
                updateFridge
            }}
        >
            {children}
        </FirestoreContext.Provider>
    );
};

ProviderFirebase.propTypes = {
    children: node.isRequired
};

export default ProviderFirebase;
