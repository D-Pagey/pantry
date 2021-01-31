import { Story } from '@storybook/react/types-6-0';
import { MobileFoodMenu, MobileFoodMenuProps } from '.';

export default { title: 'MobileFoodMenu', component: MobileFoodMenu };

const Template: Story<MobileFoodMenuProps> = (args) => <MobileFoodMenu {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    handleFilterClick: () => null
};
