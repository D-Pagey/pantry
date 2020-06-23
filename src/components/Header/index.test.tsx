import React from 'react';
import userEvent from '@testing-library/user-event';
import { useHistory } from 'react-router-dom';
import { render } from '../../test-utils';
import { Header } from '.';

jest.mock('react-router-dom', () => ({
    // @ts-ignore
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        history: {
            push: jest.fn()
        }
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

    it.skip('should call goBack when clicked on back arrow', () => {
        const history = useHistory();

        const { getByTestId } = render(<Header page="Add food" />);

        userEvent.click(getByTestId('headerBackArrow'));

        // expect history to have been called
    });
});
