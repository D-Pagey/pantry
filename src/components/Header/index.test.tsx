import React from 'react';
import userEvent from '@testing-library/user-event';

import { render } from '../../test-utils';
import { UserDan } from '../../fixtures';
import { Header } from '.';

const mockHistoryBack = jest.fn();

jest.mock('react-router-dom', () => ({
    // @ts-ignore
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        goBack: mockHistoryBack
    })
}));

const context = {
    user: UserDan
};

describe('Header component', () => {
    it('should render', () => {
        const { container } = render(<Header />, context);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render a title if provided', () => {
        const page = 'Add food';

        const { getByText } = render(<Header page={page} />, context);

        getByText(page);
    });

    it('should call goBack when clicked on back arrow', () => {
        const { getByTestId } = render(<Header page="Add food" />, context);

        userEvent.click(getByTestId('headerBackArrow'));

        expect(mockHistoryBack).toHaveBeenCalled();
    });

    it('should render a Notifications bell on mobile', () => {
        const { getByTestId } = render(<Header />, context);
        getByTestId('header-notifications');
    });

    it('should render Notifications panel if Bell is clicked', () => {
        const { getByTestId } = render(<Header />, context);

        userEvent.click(getByTestId('header-notifications'));

        getByTestId('notifications');
    });
});
