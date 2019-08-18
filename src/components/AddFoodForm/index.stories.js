import React from 'react';
import { storiesOf } from '@storybook/react';
import { FirebaseContext } from '../ProviderFirebase';
import AddFoodForm from '.';

storiesOf('AddFoodForm', module).add('default', () => (
    <FirebaseContext.Provider value={{ updateFridge: () => {} }}>
        <AddFoodForm />
    </FirebaseContext.Provider>
));
