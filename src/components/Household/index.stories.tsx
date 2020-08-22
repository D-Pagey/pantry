import React from 'react';

import { Tenant } from '../../fixtures';
import { Household } from '.';

const props = {
    tenants: [Tenant, Tenant]
};

export default { title: 'Household' };

export const normal = () => (
    <div style={{ maxWidth: 400, padding: '1rem' }}>
        <Household {...props} />
    </div>
);
