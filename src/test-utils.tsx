import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import React, { FC } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FirebaseContext } from './components/ProviderFirebase';

const AllTheProviders: FC = ({ children }) => (
    <FirebaseContext.Provider
        value={{
            categories: [],
            deleteFoodItem: () => () => null,
            expiringCount: 0,
            isAuthed: false,
            isCheckingAuth: false,
            fridge: [],
            signOut: () => null,
            updateFridge: () => null,
            user: {
                email: null,
                name: null
            }
        }}
    >
        <MemoryRouter>{children}</MemoryRouter>
    </FirebaseContext.Provider>
);

const customRender = (ui: any, options?: any) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
