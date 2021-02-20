import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '../../test-utils';
import { UserDan } from '../../fixtures';
import { BurgerMenu } from '.';

const context = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    signOut: () => null,
    user: UserDan
};

describe('BurgerMenu component', () => {
    it('should render', () => {
        const { container } = render(<BurgerMenu />, context);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should handle sign out', () => {
        const signOut = jest.fn();
        const { getByTestId } = render(<BurgerMenu />, { ...context, signOut });

        userEvent.click(getByTestId('burgerMenuSignOut'));

        expect(signOut).toHaveBeenCalled();
    });
});
