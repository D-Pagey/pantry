import React from 'react';
import { Redirect } from 'react-router-dom';
import PageSignIn from '.';

jest.mock('react-firebaseui/StyledFirebaseAuth');

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Redirect: jest.fn(() => null)
}));

const context = {
    isAuthed: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setUser: () => {}
};

describe('PageSignIn component', () => {
    it('should render', () => {
        const { container } = render(<PageSignIn />, context);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should redirect if authed', () => {
        render(<PageSignIn />, { ...context, isAuthed: true });
        expect(Redirect).toHaveBeenCalledWith({ to: '/' }, expect.any(Object));
    });
});
