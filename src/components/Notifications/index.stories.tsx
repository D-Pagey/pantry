import React from 'react';

import { UnreadNotification, ReadNotification } from '../../fixtures';
import { Notifications } from '.';

const props = {
    notifications: [UnreadNotification, ReadNotification, UnreadNotification, ReadNotification]
};

export default { title: 'Notifications' };

export const normal = () => <Notifications {...props} />;
