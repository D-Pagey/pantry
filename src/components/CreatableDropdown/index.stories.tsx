import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import { Fridge } from '../../fixtures';
import { CreatableDropdown, CreatableDropdownProps } from '.';

export default { title: 'CreatableDropdown', component: CreatableDropdown };

const names = Fridge.map((item) => ({ label: item.name, value: item.name }));

const Template: Story<CreatableDropdownProps> = (args) => <CreatableDropdown {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    options: names,
    inputName: 'storybook-creatable-dropdown',
    setSelected: () => null
};
