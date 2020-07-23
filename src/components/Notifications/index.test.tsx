import React from 'react';

import { render } from '../../test-utils';
import { UnreadNotification, ReadNotification } from '../../fixtures';
import { Notifications } from '.';

const props = {
    notifications: [UnreadNotification, ReadNotification]
};

describe('Notifications component', () => {
    it('should render', () => {
        const { container } = render(<Notifications {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
