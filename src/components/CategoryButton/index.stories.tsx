import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { CategoryButton, CategoryButtonProps } from '.';

export default { title: 'CategoryButton', component: CategoryButton };

const Template: Story<CategoryButtonProps> = (args) => <CategoryButton {...args}>Click me</CategoryButton>;

export const Primary = Template.bind({});

Primary.args = {
    isSelected: false,
    name: 'Vegetables',
    handleClick: () => null,
    small: false
};
