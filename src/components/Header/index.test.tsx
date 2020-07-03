import React from 'react';
import userEvent from '@testing-library/user-event';
import { useHistory } from 'react-router-dom';
import { render } from '../../test-utils';
import { Header } from '.';

const mockHistoryBack = jest.fn();

jest.mock('react-router-dom', () => ({
    // @ts-ignore
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        goBack: mockHistoryBack
    })
}));

describe('Header component', () => {
    it('should render', () => {
        const { container } = render(<Header />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render a title if provided', () => {
        const page = 'Add food';

        const { getByText } = render(<Header page={page} />);

        getByText(page);
    });

    it('should call goBack when clicked on back arrow', () => {
        const { getByTestId } = render(<Header page="Add food" />);

        userEvent.click(getByTestId('headerBackArrow'));

        expect(mockHistoryBack).toHaveBeenCalled();
    });
});
