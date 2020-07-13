import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '../../test-utils';
import { PageProfile } from '.';

const props = {};

const context = {
    signOut: () => {},
    user: {
        email: 'dan@gmail.com',
        name: 'Dan',
        photo: 'www.google.com'
    }
};

describe('PageProfile component', () => {
    it('should render', () => {
        const { container } = render(<PageProfile {...props} />, context);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should call sign out on click', () => {
        const signOut = jest.fn();
        const { getByTestId } = render(<PageProfile {...props} />, { ...context, signOut });

        userEvent.click(getByTestId('pageProfileButton'));

        expect(signOut).toHaveBeenCalled();
    });
});
