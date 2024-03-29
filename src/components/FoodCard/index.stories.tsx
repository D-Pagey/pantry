import React from 'react';
import { TenantDan, TenantHeidi, TenantJoe, Fridge } from '../../fixtures';
import { FoodCard, FoodCardProps } from '.';

export default { title: 'FoodCard', component: FoodCard };

export const Basic = (args: FoodCardProps): JSX.Element => <FoodCard {...args} />;

Basic.args = {
    handleClick: () => console.log('fired'),
    margin: '1rem 0 0 1rem',
    item: { ...Fridge[0], name: 'Evaporated Milk Can (Small)' },
    tenants: [TenantDan, TenantHeidi, TenantJoe]
};

Basic.argTypes = {
    tenants: { control: { disable: true } },
    handleClick: { control: { disable: true } },
    margin: { control: { disable: true } }
};
