import React from 'react';
import PageProfile from '.';
import userEvent from '@testing-library/user-event';

const props = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    signOut: () => {}
};

const context = {
    user: {
        email: 'dan@gmail.com',
        name: 'Dan'
    }
};

describe('PageProfile component', () => {
    it('should render', () => {
        const { container } = render(<PageProfile {...props} />, context);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should call sign out on click', () => {
        const signOut = jest.fn();
        const { getByTestId } = render(<PageProfile {...props} signOut={signOut} />, context);

        userEvent.click(getByTestId('pageProfileButton'));

        expect(signOut).toHaveBeenCalled();
    });
});
