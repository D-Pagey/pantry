import React from 'react';

import { render } from '../../test-utils';
import { TenantDan, UserDan } from '../../fixtures';
import { Household } from '.';

const props = {
    tenants: [TenantDan],
    user: UserDan
};

describe('Household component', () => {
    it('should render', () => {
        const { container } = render(<Household {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
