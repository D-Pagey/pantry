import React from 'react';
import { Redirect } from 'react-router-dom';
import { render } from '../../test-utils';
import { PageSignIn } from '.';

jest.mock('react-router-dom', () => ({
    // @ts-ignore
    ...jest.requireActual('react-router-dom'),
    Redirect: jest.fn(() => null)
}));

describe('PageSignIn component', () => {
    it('should render', () => {
        const { container } = render(<PageSignIn />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it.skip('should redirect if authed', () => {
        render(<PageSignIn />);
        expect(Redirect).toHaveBeenCalledWith({ to: '/food' }, expect.any(Object));
    });

    it.todo('should show that an email has been sent');
});
