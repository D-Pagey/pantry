import React from 'react';

import { render } from '../../test-utils';
import { User } from '../../fixtures';
import { Household } from '.';

const props = {
    people: [
        { ...User, uid: '1' },
        { ...User, uid: '2' },
        { ...User, uid: '3' }
    ]
};

describe('Household component', () => {
    it('should render', () => {
        const { container } = render(<Household {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
