import React from 'react';
import { FoodCardBatches } from '../../fixtures';
import { FoodCard } from '.';

export default { title: 'FoodCard' };

const props = {
    batches: FoodCardBatches,
    handleClick: () => console.log('fired'),
    margin: '1rem 0 0 1rem',
    name: 'Carrots'
};

export const normal = () => (
    <>
        <FoodCard {...props} />
        <FoodCard {...props} name="Too many carrots" batches={[...FoodCardBatches, ...FoodCardBatches]} />
    </>
);

export const selected = () => <FoodCard {...props} isSelected />;
