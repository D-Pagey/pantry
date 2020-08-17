import React from 'react';

import { render } from '../../test-utils';
import { UserDan, WelcomeNotification, UnreadNotification } from '../../fixtures';
import { Notifications } from '.';

const props = {
    notifications: [WelcomeNotification, UnreadNotification],
    onClose: () => {},
    user: UserDan
};

describe('Notifications component', () => {
    it('should render', () => {
        const { container } = render(<Notifications {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
