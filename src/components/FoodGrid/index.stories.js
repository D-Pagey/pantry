import React from 'react';
import { storiesOf } from '@storybook/react';
import { FirebaseContext } from '../ProviderFirebase';
import FoodGrid from '.';

const firebaseContext = {
    updateFridge: () => {}
};

const props = {
    data: [
        {
            category: { label: 'Meat', value: 'meat' },
            expires: new Date(2019, 2, 14),
            name: 'chicken',
            servings: { label: '1', value: '1' }
        },
        {
            category: { label: 'Fish', value: 'fish' },
            expires: new Date(2019, 3, 9),
            name: 'salmon',
            servings: { label: '2', value: '2' }
        },
        {
            category: { label: 'Vegetables', value: 'vegetables' },
            expires: new Date(2014, 6, 11),
            name: 'carrots',
            servings: { label: '3', value: '3' }
        }
    ]
};

storiesOf('FoodGrid', module).add('default', () => (
    <FirebaseContext.Provider value={firebaseContext}>
        <FoodGrid {...props} />
    </FirebaseContext.Provider>
));
