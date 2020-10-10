import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '../../test-utils';
import { BurgerMenu } from '.';

const context = {
    isAuthed: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    signOut: () => null
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
