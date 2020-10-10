import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import { TenantAlexa, TenantDan, TenantHeidi, TenantJoe } from '../../fixtures';
import { Household, HouseholdProps } from '.';

export default { title: 'Household', component: Household };

const Template: Story<HouseholdProps> = (args) => <Household {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    tenants: [TenantHeidi, TenantDan, TenantJoe, TenantAlexa]
};
