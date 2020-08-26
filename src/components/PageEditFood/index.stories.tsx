import React from 'react';
import { PageEditFood, PageEditFoodProps } from '.';
import { Fridge } from '../../fixtures';

export default { 
    title: 'PageEditFood',
    component: PageEditFood
};

export const Basic = (args: PageEditFoodProps) => <PageEditFood {...args} />;

Basic.args = {
    fridge: Fridge
};

Basic.argTypes = {
    fridge: {
        control: { disable: true }
    }
};