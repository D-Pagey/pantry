import React from 'react';

import { Fridge, TenantHeidi } from '../../fixtures';
import { EditFoodServings } from '.';

export default { title: 'EditFoodServings', component: EditFoodServings };

export const normal = (args: any) => <EditFoodServings {...args} />;

normal.args = {
    item: Fridge[0],
    tenants: [TenantHeidi],
    updateFridge: () => {}
};
