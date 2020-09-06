import React from 'react';

import { render } from '../../test-utils';
import { Fridge, TenantHeidi } from '../../fixtures';
import { PageEditFood } from '.';

const props = {
    fridge: Fridge,
    tenants: [TenantHeidi]
};

describe('PageEditFood component', () => {
    it('should render', () => {
        const { container } = render(<PageEditFood {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
