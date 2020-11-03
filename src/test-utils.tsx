import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import React, { FC, ReactNode } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MockDate from 'mockdate';
import { AuthContext } from './components/ProviderAuth';

MockDate.set('01/01/2020');

globalThis.Notification = ({
    requestPermission: jest.fn(),
    permission: 'granted'
} as unknown) as jest.Mocked<typeof Notification>;

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
    /* eslint-disable react/display-name */
    render(ui, { wrapper: () => <AllTheProviders customContext={customContext}>{ui}</AllTheProviders>, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
