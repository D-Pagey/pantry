import React from 'react';
import BurgerMenu from '.';
import userEvent from '@testing-library/user-event';

const context = {
    isAuthed: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    signOut: () => {}
};

describe('BurgerMenu component', () => {
    it('should render', () => {
        const { container } = render(<BurgerMenu />, context);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should handle sign out', () => {
        const signOut = jest.fn();
        const { getByTestId } = render(<BurgerMenu />, { ...context, isAuthed: true, signOut });

        userEvent.click(getByTestId('burgerMenuSignOut'));

        expect(signOut).toHaveBeenCalled();
    });
});
