import { FC } from 'react';
import { Fridge, TenantHeidi, TenantDan } from '../../fixtures';
import { EditFoodServings } from '.';

export default { title: 'EditFoodServings', component: EditFoodServings };

export const normal = (args: any) => <EditFoodServings {...args} />;

normal.args = {
    dispatch: () => null,
    item: Fridge[0],
    tenants: [TenantHeidi, TenantDan]
};
