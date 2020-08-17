import React from 'react';

import { render } from '../../test-utils';
import { UserDan } from '../../fixtures';
import { Household } from '.';

const props = {
    people: [
        { ...UserDan, uid: '1' },
        { ...UserDan, uid: '2' },
        { ...UserDan, uid: '3' }
    ]
};

describe('Household component', () => {
    it('should render', () => {
        const { container } = render(<Household {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
