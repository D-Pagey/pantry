import React from 'react';

import { render } from '../../test-utils';
import { Tenant } from '../../fixtures';
import { Household } from '.';

const props = {
    tenants: [Tenant]
};

describe('Household component', () => {
    it('should render', () => {
        const { container } = render(<Household {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
