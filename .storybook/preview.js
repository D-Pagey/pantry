import React from 'react';
import { addDecorator } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { FirebaseContext } from '../src/components/ProviderFirebase';
import { CategoriesWithCounts } from '../src/fixtures/categories';
import { GlobalStyle } from '../src/components/App/styles';


addDecorator((storyFn) => (
    <FirebaseContext.Provider
        value={{
            categories: CategoriesWithCounts
        }}
    >
        <MemoryRouter>
            <GlobalStyle />

            {storyFn()}
        </MemoryRouter>
    </FirebaseContext.Provider>
));
