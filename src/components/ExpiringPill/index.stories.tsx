import React from 'react';
import { ExpiringPill } from '.';

export default { title: 'ExpiringPill' };

const props = {
    handleClick: () => null
};

export const disabled = () => <ExpiringPill {...props} />;
export const enabled = () => <ExpiringPill {...props} isEnabled />;
