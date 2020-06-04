import React from 'react';
import { addDecorator } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { FirebaseContext } from '../src/components/ProviderFirebase';
import { CategoriesWithCounts } from '../src/fixtures/categories';

addDecorator((storyFn) => (
    <FirebaseContext.Provider
        value={{
            categories: CategoriesWithCounts
        }}
    >
        <MemoryRouter>{storyFn()}</MemoryRouter>
    </FirebaseContext.Provider>
));
