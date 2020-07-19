import React from 'react';

import { render } from '../../test-utils';
import { User } from '../../fixtures';
import { Friends } from '.';

const props = {
    friends: [User, User, User]
};

describe('Friends component', () => {
    it('should render', () => {
        const { container } = render(<Friends {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
