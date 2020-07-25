import React from 'react';
import userEvent from '@testing-library/user-event';

import { render } from '../../test-utils';
import { UnreadNotification, ReadNotification } from '../../fixtures';
import { Notifications } from '.';

const props = {
    handleClick: () => {},
    handleDismiss: () => {},
    notifications: [UnreadNotification, ReadNotification]
};

describe('Notifications component', () => {
    it('should render', () => {
        const { container } = render(<Notifications {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it.each`
        didAccept | button
        ${true}   | ${'Accept'}
        ${false}  | ${'Decline'}
    `('should call handleClick with $didAccept when $button clicked', ({ didAccept, button }) => {
        const handleClick = jest.fn();
        const { getAllByText } = render(<Notifications {...props} handleClick={handleClick} />);

        userEvent.click(getAllByText(button)[0]);

        expect(handleClick).toHaveBeenCalledWith(UnreadNotification.uid, didAccept);
    });
});
