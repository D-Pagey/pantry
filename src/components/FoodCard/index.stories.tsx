import React from 'react';
import { Batches } from '../../fixtures';
import { FoodCard } from '.';

export default { title: 'FoodCard' };

const props = {
    batches: Batches,
    handleClick: () => console.log('fired'),
    margin: '1rem 0 0 1rem',
    name: 'Carrots'
};

export const normal = () => <FoodCard {...props} />;
export const selected = () => <FoodCard {...props} isSelected />;
