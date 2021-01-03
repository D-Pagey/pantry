import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { render } from '../../test-utils';
import { RouteProtected } from '.';

jest.mock('react-router-dom', () => ({
    // @ts-ignore
    ...jest.requireActual('react-router-dom'),
    Route: jest.fn(() => null),
    Redirect: jest.fn(() => null)
}));

const props = {
    path: '/test',
    // eslint-disable-next-line react/display-name
    component: () => <div />
};

describe('RouteProtected component', () => {
    it.skip('should render protected route when authed', () => {
        render(<RouteProtected {...props} />, { isAuthed: true });
        expect(Route).toHaveBeenCalledWith(props, expect.any(Object));
    });

    it.skip('should render redirect when not authed', () => {
        render(<RouteProtected {...props} />);
        expect(Redirect).toHaveBeenCalledWith({ to: '/sign-in' }, expect.any(Object));
    });

    it('should render nothing whilst checking auth', () => {
        const { getByTestId } = render(<RouteProtected {...props} />, { isCheckingAuth: true });
        getByTestId('loading');
    });
});
