import React from 'react';
import { storiesOf } from '@storybook/react';
import AddFoodForm from '.';
import { FirebaseContext } from '../ProviderFirebase';

const props = {};

storiesOf('AddFoodForm', module).add('default', () => (
    <FirebaseContext.Provider value={{ updateFridge: () => {} }}>
        <AddFoodForm {...props} />
    </FirebaseContext.Provider>
));
