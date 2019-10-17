import React from 'react';
import { storiesOf } from '@storybook/react';
import { FirebaseContext } from '../ProviderFirebase';
import FoodTable from '.';

const props = {
    match: {
        params: {
            category: 'all'
        }
    }
};

const firebaseContext = {
    fridge: [
        {
            category: 'meat',
            expires: new Date(2019, 9, 12),
            name: 'chicken',
            servings: 2
        },
        {
            category: 'fish',
            expires: new Date(2019, 3, 9),
            name: 'salmon',
            servings: 1
        }
    ],
    updateFridge: () => {}
};

storiesOf('FoodTable', module).add('default', () => (
    <FirebaseContext.Provider value={firebaseContext}>
        <FoodTable {...props} />
    </FirebaseContext.Provider>
));
