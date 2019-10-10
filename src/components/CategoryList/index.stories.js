import React from 'react';
import { storiesOf } from '@storybook/react';
import { FirebaseContext } from '../ProviderFirebase';
import CategoryList from '.';

const props = {};

const firebaseContext = {
    categoryCounts: [
        { category: 'Meat', count: 2 },
        { category: 'Fish', count: 3 },
        { category: 'Vegetables', count: 5 }
    ]
};

storiesOf('CategoryList', module)
    .addDecorator((storyFn) => (
        <FirebaseContext.Provider value={{ ...firebaseContext }}>
            {storyFn()}
        </FirebaseContext.Provider>
    ))
    .add('default', () => <CategoryList {...props} />);
