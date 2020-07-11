import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import React, { FC, ReactNode } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import MockDate from 'mockdate';
import { AuthContext } from './components/ProviderAuth';

MockDate.set('01/01/2020');

type AllTheProvidersProps = {
    children: ReactNode;
    customContext?: any;
};

const AllTheProviders: FC<AllTheProvidersProps> = ({ children, customContext }) => (
    <AuthContext.Provider
        value={{
            ...customContext
        }}
    >
        <MemoryRouter>{children}</MemoryRouter>
    </AuthContext.Provider>
);

const customRender = (ui: any, customContext?: any, options?: any) =>
    render(ui, { wrapper: () => <AllTheProviders customContext={customContext}>{ui}</AllTheProviders>, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
