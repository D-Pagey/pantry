import React from 'react';
import { Batches } from '../../fixtures';
import { FoodCard, FoodCardProps } from '.';

export default { title: 'FoodCard', component: FoodCard };

export const Basic = (args: FoodCardProps) => <FoodCard {...args} />;

Basic.args = {
    batches: Batches,
    handleClick: () => console.log('fired'),
    margin: '1rem 0 0 1rem',
    name: 'Carrots',
};

Basic.argTypes = {
    batches: { 
        control: { 
            type: 'select', 
            options: { multipleOwners: Batches, singleOwner: [Batches[0]] }
         },
        //  defaultValue: Batches
    },
    handleClick: { control: { disable: true } },
    margin: { control: { disable: true } },
};
