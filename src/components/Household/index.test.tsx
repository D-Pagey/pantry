import React from 'react';

import { render } from '../../test-utils';
import { TenantHeidi } from '../../fixtures';
import { Household } from '.';

const props = {
    tenants: [TenantHeidi]
};

describe('Household component', () => {
    it('should render', () => {
        const { container } = render(<Household {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
