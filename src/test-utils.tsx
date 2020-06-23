import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import React, { FC, ReactNode } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FirebaseContext } from './components/ProviderFirebase';

type AllTheProvidersProps = {
    children: ReactNode;
    customContext?: any;
};

const AllTheProviders: FC<AllTheProvidersProps> = ({ children, customContext }) => (
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
            },
            ...customContext
        }}
    >
        <MemoryRouter>{children}</MemoryRouter>
    </FirebaseContext.Provider>
);

const customRender = (ui: any, customContext?: any, options?: any) =>
    render(ui, { wrapper: () => <AllTheProviders customContext={customContext}>{ui}</AllTheProviders>, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
