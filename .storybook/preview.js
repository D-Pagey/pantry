import React from 'react';
import { addDecorator } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../src/components/ProviderAuth';
import { GlobalStyle } from '../src/components/App/styles';

addDecorator((storyFn) => (
    <AuthContext.Provider value={{}}>
        <MemoryRouter>
            <GlobalStyle />

            {storyFn()}
        </MemoryRouter>
    </AuthContext.Provider>
));
