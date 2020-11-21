import React from 'react';
import { render } from '../../test-utils';
import { TenantDan, TenantHeidi } from '../../fixtures';
import { OwnerFilter } from '.';

const props = {
    tenants: [TenantDan, TenantHeidi],
    setSelectedTenants: () => null,
    selectedTenants: []
};

describe('OwnerFilter component', () => {
    it('should render', () => {
        const { container } = render(<OwnerFilter {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
