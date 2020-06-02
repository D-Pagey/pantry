import React from 'react';
import { CategoriesArray, Fridge } from '../../fixtures';
import { FirebaseContext } from '../ProviderFirebase';
import { CategoryList } from '.';

const firebaseContext = {
    categories: CategoriesArray,
    fridge: Fridge
};

export default { title: 'CategoryList' };

export const withText = () => (
    <FirebaseContext.Provider value={{ ...firebaseContext }}>
        <CategoryList />
    </FirebaseContext.Provider>
);
