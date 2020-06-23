import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '../../test-utils';
import { ExpiringPill } from '.';

const props = {
    handleClick: () => {}
};

describe('ExpiringPill component', () => {
    it('should render', () => {
        const { container } = render(<ExpiringPill {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render close icon when enabled', () => {
        const { getByText } = render(<ExpiringPill {...props} isEnabled />);
        getByText('Expiring soon x');
    });

    it('should call handleClick when clicked', () => {
        const handleClick = jest.fn();
        const { getByTestId } = render(<ExpiringPill {...props} handleClick={handleClick} />);

        userEvent.click(getByTestId('expiringPill'));

        expect(handleClick).toHaveBeenCalled();
    });
});
