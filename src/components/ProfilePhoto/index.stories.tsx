import React from 'react';

import { UserDan } from '../../fixtures';
import { ProfilePhoto } from '.';

export default {
    title: 'ProfilePhoto',
    component: ProfilePhoto
};

export const normal = (args: any) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'max-content max-content', gridGap: '1rem' }}>
        <ProfilePhoto {...args} />
        <ProfilePhoto {...args} owner={{ name: null, email: UserDan.email, photo: null }} />
    </div>
);

normal.args = {
    owner: UserDan
};
