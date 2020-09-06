import React from 'react';

import { Tenant } from '../../fixtures';
import { ProfilePhoto } from '.';

export default {
    title: 'ProfilePhoto',
    component: ProfilePhoto
};

export const normal = (args: any) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'max-content max-content', gridGap: '1rem' }}>
        <ProfilePhoto {...args} />
        <ProfilePhoto {...args} photoUrl={Tenant.photo} />
    </div>
);

normal.args = {
    fullName: Tenant.name,
};
