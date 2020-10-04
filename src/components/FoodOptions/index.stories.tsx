import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { FoodOptions, FoodOptionsProps } from '.';

export default { title: 'FoodOptions', component: FoodOptions };

const Template: Story<FoodOptionsProps> = (args) => <FoodOptions {...args}/>;

export const Primary = Template.bind({});

Primary.args = {
    handleDelete: () => {},
    handleEdit: () => {},
    name: 'Carrots'
};
