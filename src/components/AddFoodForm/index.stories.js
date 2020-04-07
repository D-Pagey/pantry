import React from 'react';
import { storiesOf } from '@storybook/react';
import { FirebaseContext } from '../ProviderFirebase';
import { AddFoodForm } from '.';

const firebaseContext = {
    fridge: [],
    categories: [
        {
            label: 'Meat',
            colour: 'red'
        },
        {
            label: 'Vegetables',
            colour: 'green'
        }
    ],
    updateFridge: () => {}
};

storiesOf('AddFoodForm', module).add('default', () => (
    <FirebaseContext.Provider value={{ ...firebaseContext }}>
        <AddFoodForm />
    </FirebaseContext.Provider>
));
