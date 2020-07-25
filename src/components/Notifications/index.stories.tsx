import React from 'react';

import { UnreadNotification, ReadNotification } from '../../fixtures';
import { Notifications } from '.';

const props = {
    handleClick: (itemUid: string, didAccept: boolean) => console.log({ didAccept, itemUid }),
    handleDismiss: (itemUid: string) => console.log({ itemUid }),
    notifications: [UnreadNotification, ReadNotification, UnreadNotification, ReadNotification]
};

export default { title: 'Notifications' };

export const normal = () => <Notifications {...props} />;
