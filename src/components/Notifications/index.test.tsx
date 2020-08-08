import React from 'react';

import { render } from '../../test-utils';
import { User, WelcomeNotification, UnreadNotification } from '../../fixtures';
import { Notifications } from '.';

const props = {
    notifications: [WelcomeNotification, UnreadNotification],
    onClose: () => {},
    user: User
};

describe('Notifications component', () => {
    it('should render', () => {
        const { container } = render(<Notifications {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
