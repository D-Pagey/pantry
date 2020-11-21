import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { CategoryFilterDesktop, CategoryFilterDesktopProps } from '.';

export default { title: 'CategoryFilterDesktop', component: CategoryFilterDesktop };

const Template: Story<CategoryFilterDesktopProps> = (args) => <CategoryFilterDesktop {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    categories: { meat: 5, fish: 2, vegetables: 1, dairy: 1 },
    handleCategoryClick: (category) => console.log({ category }),
    selected: 'all'
};
