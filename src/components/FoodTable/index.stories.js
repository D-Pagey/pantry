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
            category: { label: 'Meat', value: 'meat' },
            expires: new Date(2019, 9, 12),
            name: 'chicken',
            servings: { label: '2', value: '2' }
        },
        {
            category: { label: 'Fish', value: 'fish' },
            expires: new Date(2019, 3, 9),
            name: 'salmon',
            servings: { label: '1', value: '1' }
        }
    ],
    updateFridge: () => {}
};

storiesOf('FoodTable', module).add('default', () => (
    <FirebaseContext.Provider value={firebaseContext}>
        <FoodTable {...props} />
    </FirebaseContext.Provider>
));
