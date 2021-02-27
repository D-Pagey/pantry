import { Fridge, TenantHeidi, TenantDan, TenantJoe } from '../../fixtures';
import { EditFoodServings } from '.';

export default { title: 'EditFoodServings', component: EditFoodServings };

export const normal = (args: any): JSX.Element => <EditFoodServings {...args} />;

normal.args = {
    dispatch: () => null,
    item: Fridge[0],
    tenants: [TenantHeidi, TenantDan, TenantJoe]
};
