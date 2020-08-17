import React from 'react';

import { UnreadNotification, UserDan, WelcomeNotification } from '../../fixtures';
import { Notifications } from '.';

const props = {
    notifications: [WelcomeNotification, UnreadNotification],
    onClose: () => {},
    user: UserDan
};

export default { title: 'Notifications' };

export const normal = () => (
    <div style={{ width: 50, position: 'relative', right: '-210px' }}>
        <Notifications {...props} />
    </div>
);
