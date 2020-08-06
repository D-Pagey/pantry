import React from 'react';

import { User } from '../../fixtures';
import { UserType } from '../../types';
import { Household } from '.';

const JoinerUser: UserType = {
    ...User,
    houseRole: 'joiner'
};

const props = {
    people: [{ ...User, houseRole: 'owner' }, JoinerUser, JoinerUser]
};

export default { title: 'Household' };

export const normal = () => (
    <div style={{ maxWidth: 400, padding: '1rem' }}>
        <Household {...props} />
    </div>
);
