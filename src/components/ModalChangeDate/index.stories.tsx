import { Story } from '@storybook/react/types-6-0';
import { ModalChangeDate, ModalChangeDateTypes } from '.';

export default { title: 'ModalChangeDate', component: ModalChangeDate };

const Template: Story<ModalChangeDateTypes> = (args) => (
    <div style={{ maxWidth: 400 }}>
        <ModalChangeDate {...args} />
    </div>
);

export const Primary = Template.bind({});

Primary.args = {
    expires: new Date(),
    handleDateChange: () => null,
    handleModalClose: () => null
};
