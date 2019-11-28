import React from 'react';
import { storiesOf } from '@storybook/react';
import { FirestoreContext } from '../ProviderFirestore';
import AddFoodForm from '.';

const firebaseContext = {
    fridge: [],
    foodCategories: [
        {
            label: 'Meat',
            value: 'meat'
        },
        {
            label: 'Vegetables',
            value: 'vegetables'
        }
    ],
    updateFridge: () => {}
};

storiesOf('AddFoodForm', module).add('default', () => (
    <FirestoreContext.Provider value={{ ...firebaseContext }}>
        <AddFoodForm />
    </FirestoreContext.Provider>
));
