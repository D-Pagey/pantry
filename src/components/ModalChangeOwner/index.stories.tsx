import { Story } from '@storybook/react/types-6-0';
import { ModalChangeOwner, ModalChangeOwnerProps } from '.';
import { TenantDan, TenantHeidi, TenantJoe } from '../../fixtures';

export default { title: 'ModalChangeOwner', component: ModalChangeOwner };

const Template: Story<ModalChangeOwnerProps> = (args) => (
    <div style={{ maxWidth: 400 }}>
        <ModalChangeOwner {...args} />
    </div>
);

export const Primary = Template.bind({});

Primary.args = {
    currentOwner: TenantDan,
    expiryDate: new Date(),
    itemName: 'steak',
    tenants: [TenantDan, TenantHeidi, TenantJoe],
    unit: 'serving'
};
