/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { FirebaseContext } from '../ProviderFirebase';
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
    <FirebaseContext.Provider value={{ ...firebaseContext }}>
        <AddFoodForm />
    </FirebaseContext.Provider>
));
