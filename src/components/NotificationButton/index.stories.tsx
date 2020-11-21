import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { NotificationButton, NotificationButtonProps } from '.';

export default { title: 'NotificationButton', component: NotificationButton };

const Template: Story<NotificationButtonProps> = (args) => <NotificationButton {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
