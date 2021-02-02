import { Story } from '@storybook/react/types-6-0';
import { TenantDan, TenantHeidi } from '../../fixtures';
import { MobileFoodMenu, MobileFoodMenuProps } from '.';

export default { title: 'MobileFoodMenu', component: MobileFoodMenu };

const Template: Story<MobileFoodMenuProps> = (args) => <MobileFoodMenu {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    tenants: [TenantDan, TenantHeidi],
    editingItemName: ''
};
