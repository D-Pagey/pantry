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

export const withoutLabel = () => <Input {...props} />;
export const withLabel = () => <Input {...props} label="Name" />;
export const withError = () => <Input {...props} error="Required" />;
