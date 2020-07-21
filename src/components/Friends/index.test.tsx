import React from 'react';

import { render } from '../../test-utils';
import { User } from '../../fixtures';
import { Friends } from '.';

const props = {
    friends: [
        { ...User, uid: '1' },
        { ...User, uid: '2' },
        { ...User, uid: '3' }
    ]
};

describe('Friends component', () => {
    it('should render', () => {
        const { container } = render(<Friends {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
