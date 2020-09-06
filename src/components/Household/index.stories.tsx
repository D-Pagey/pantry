import React from 'react';

import { TenantHeidi } from '../../fixtures';
import { Household } from '.';

const props = {
    tenants: [TenantHeidi, TenantHeidi]
};

export default { title: 'Household' };

export const normal = () => (
    <div style={{ maxWidth: 400, padding: '1rem' }}>
        <Household {...props} />
    </div>
);
