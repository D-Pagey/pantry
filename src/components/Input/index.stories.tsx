import React from 'react';
import { Input } from '.';

const props = {
    name: 'test',
    onBlur: () => {},
    onChange: () => {},
    testId: 'storybookInput',
    placeholder: 'test',
    value: ''
};

export default { title: 'Input' };

export const normal = () => <Input {...props} />;
