import React from 'react';
import { storiesOf } from '@storybook/react';
import { FirebaseContext } from '../ProviderFirebase';
import { CategoryList } from '.';

const props = {};

const firebaseContext = {
    categories: [
        { label: 'Meat', count: 2, colour: 'red' },
        { label: 'Fish', count: 3, colour: 'blue' },
        { label: 'Vegetables', count: 5, colour: 'green' }
    ]
};

storiesOf('CategoryList', module)
    .addDecorator((storyFn) => (
        <FirebaseContext.Provider value={{ ...firebaseContext }}>{storyFn()}</FirebaseContext.Provider>
    ))
    .add('default', () => <CategoryList {...props} />);
