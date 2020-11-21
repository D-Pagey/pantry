import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import Tick from './tick.svg';
import { NotificationButton, NotificationButtonProps } from '.';

export default { title: 'NotificationButton', component: NotificationButton };

const Template: Story<NotificationButtonProps> = (args) => (
    <NotificationButton {...args}>
        <Tick />
    </NotificationButton>
);

export const Primary = Template.bind({});

Primary.args = {};
