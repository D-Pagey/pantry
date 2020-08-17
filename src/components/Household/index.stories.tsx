import React from 'react';

import { UserDan } from '../../fixtures';
import { UserType } from '../../types';
import { Household } from '.';

const JoinerUser: UserType & { houseRole?: string } = {
    ...UserDan,
    houseRole: 'joiner'
};

const props = {
    people: [{ ...UserDan, houseRole: 'owner' }, JoinerUser, JoinerUser]
};

export default { title: 'Household' };

export const normal = () => (
    <div style={{ maxWidth: 400, padding: '1rem' }}>
        <Household {...props} />
    </div>
);
