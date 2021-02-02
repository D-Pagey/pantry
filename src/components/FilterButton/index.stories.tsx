import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { FilterButton, FilterButtonProps } from '.';

export default { title: 'FilterButton', component: FilterButton };

const Template: Story<FilterButtonProps> = (args) => (
    <>
        <FilterButton {...args} />
        <FilterButton>Sorted By Date</FilterButton>
    </>
);

export const Primary = Template.bind({});

Primary.args = {
    children: 'Vegetables',
    onClick: () => null
};
