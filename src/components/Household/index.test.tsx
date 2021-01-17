import React from 'react';

import { render } from '../../test-utils';
import { TenantDan, UserDan, TenantJoe, TenantHeidi } from '../../fixtures';
import { TenantType } from '../../types';
import { Household } from '.';

const InvitedJoe: TenantType = {
    ...TenantJoe,
    houseRole: 'pending'
};

const AdminHeidi: TenantType = {
    ...TenantHeidi,
    houseRole: 'admin'
};

const props = {
    tenants: [TenantDan, InvitedJoe, AdminHeidi],
    user: UserDan
};

describe('Household component', () => {
    it('should render', () => {
        const { container } = render(<Household {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
