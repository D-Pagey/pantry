import React from 'react';

import { render, waitFor } from '../../test-utils';
import { PageMagicLanding } from '.';

const mockRedirect = jest.fn();

jest.mock('react-router-dom', () => ({
    // @ts-ignore
    ...jest.requireActual('react-router-dom'),
    Redirect: () => mockRedirect()
}));

const context = {
    fetchUserData: () => null
};

describe('PageMagicLanding component', () => {
    it('should render', () => {
        const { container } = render(<PageMagicLanding />, context);
        expect(container.firstChild).toMatchSnapshot();
    });

    it.skip('should redirect if authed', async () => {
        render(<PageMagicLanding />, { ...context });
        await waitFor(() => expect(mockRedirect).toHaveBeenCalledWith({ to: '/food' }, expect.any(Object)));
    });
});
