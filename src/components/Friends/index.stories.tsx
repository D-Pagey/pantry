import React from 'react';
import { Friends } from '.';
import { User } from '../../fixtures';

const props = {
    friends: [User, User, User]
};

export default { title: 'Friends' };

export const normal = () => <Friends {...props} />;
