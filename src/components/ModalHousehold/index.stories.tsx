import { Story } from '@storybook/react/types-6-0';
import { ModalHousehold, ModalHouseholdProps } from '.';
import { TenantDan } from '../../fixtures';

export default { title: 'ModalHousehold', component: ModalHousehold };

const Template: Story<ModalHouseholdProps> = (args) => <ModalHousehold {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    loading: false,
    currentTenant: TenantDan,
    handleCancelInvite: () => null,
    handleClose: () => null,
    handleLeaveHousehold: () => null,
    handlePromoteUser: () => null,
    handleRemoveUser: () => null
};
