import React from 'react';
import { CategoriesArray, Fridge } from '../../fixtures';
import { FirebaseContext } from '../ProviderFirebase';
import { CategoryList } from '.';

const firebaseContext: any = {
    addNewCategories: () => null,
    deleteCategory: () => null,
    deleteFoodItem: () => () => null,
    expiringCount: 0,
    isAuthed: false,
    isCheckingAuth: false,
    signOut: () => null,
    updateFridge: () => null,
    user: {
        email: null,
        name: null
    },
    categories: CategoriesArray,
    fridge: Fridge
};

export default { title: 'CategoryList' };

export const withText = () => (
    <FirebaseContext.Provider value={firebaseContext}>
        <CategoryList />
    </FirebaseContext.Provider>
);
