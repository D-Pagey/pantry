import React from 'react';

import { render } from '../../test-utils';
import { User } from '../../fixtures';
import { Notifications } from '.';

const props = {
    onClose: () => {}
};

const context = {
    user: User
};

describe('Notifications component', () => {
    it('should render', () => {
        const { container } = render(<Notifications {...props} />, context);
        expect(container.firstChild).toMatchSnapshot();
    });
});
