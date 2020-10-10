import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { Input, InputProps } from '.';

export default { title: 'Input', component: Input };

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    disabled: false,
    name: 'test',
    onBlur: () => null,
    onChange: () => null,
    testId: 'storybookInput',
    placeholder: 'test',
    value: ''
};
