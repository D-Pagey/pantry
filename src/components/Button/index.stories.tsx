import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { Button, ButtonProps } from '.';

export default { title: 'Button', component: Button };

const Template: Story<ButtonProps> = (args) => <Button {...args}>Click me</Button>;

export const Primary = Template.bind({});

Primary.args = {};
