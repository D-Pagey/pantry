import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { OwnerFilter, OwnerFilterProps } from '.';
import { TenantAlexa, TenantDan, TenantHeidi } from '../../fixtures';

export default { title: 'OwnerFilter', component: OwnerFilter };

const Template: Story<OwnerFilterProps> = (args) => <OwnerFilter {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    tenants: [TenantDan, TenantAlexa, TenantHeidi],
    setSelectedTenants: (uid) => console.log({ uid }),
    selectedTenants: []
};
