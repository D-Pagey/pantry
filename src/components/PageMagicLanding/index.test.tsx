import React from 'react';
import { Redirect } from 'react-router-dom';

import { render } from '../../test-utils';
import { PageMagicLanding } from '.';

jest.mock('react-router-dom', () => ({
    // @ts-ignore
    ...jest.requireActual('react-router-dom'),
    Redirect: jest.fn(() => null)
}));

const context = {
    isAuthed: false,
    fetchUserData: () => {}
};

describe('PageMagicLanding component', () => {
    it('should render', () => {
        const { container } = render(<PageMagicLanding />, context);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should redirect if authed', () => {
        render(<PageMagicLanding />, { ...context, isAuthed: true });
        expect(Redirect).toHaveBeenCalledWith({ to: '/food' }, expect.any(Object));
    });
});
