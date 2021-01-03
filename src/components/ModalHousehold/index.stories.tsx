import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { ModalHousehold, ModalHouseholdProps } from '.';

export default { title: 'ModalHousehold', component: ModalHousehold };

const Template: Story<ModalHouseholdProps> = (args) => <ModalHousehold {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    showCancelOption: true,
    showLeaveOption: true,
    showPromoteOption: true,
    showRemoveOption: true
};
