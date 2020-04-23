import React from 'react';
import { storiesOf } from '@storybook/react';

import { Fridge } from '../../fixtures';
import { FirebaseContext } from '../ProviderFirebase';
import { FoodTable } from '.';

const props = {
    food: Fridge,
    handleEdit: () => {},
    setFood: () => {}
};

const firebaseContext = {
    deleteFoodItem: () => {}
};

storiesOf('FoodTable', module)
    .addDecorator((storyFn) => (
        <FirebaseContext.Provider value={{ ...firebaseContext }}>{storyFn()}</FirebaseContext.Provider>
    ))
    .add('default', () => <FoodTable {...props} />);
