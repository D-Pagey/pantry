import React from 'react';
import { storiesOf } from '@storybook/react';

import { CategoriesArray, Fridge } from '../../fixtures';
import { FirebaseContext } from '../ProviderFirebase';
import { CategoryList } from '.';

const props = {};

const firebaseContext = {
    categories: CategoriesArray,
    fridge: Fridge
};

storiesOf('CategoryList', module)
    .addDecorator((storyFn) => (
        <FirebaseContext.Provider value={{ ...firebaseContext }}>{storyFn()}</FirebaseContext.Provider>
    ))
    .add('default', () => <CategoryList {...props} />);
