import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { ChooseCategory, ChooseCategoryProps } from '.';

export default { title: 'ChooseCategory', component: ChooseCategory };

const Template: Story<ChooseCategoryProps> = (args) => <ChooseCategory {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    handleClick: () => {},
    selected: '',
    small: false
};
