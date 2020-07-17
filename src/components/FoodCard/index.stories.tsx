import React from 'react';
import { Batches, User } from '../../fixtures';
import { FoodCard } from '.';

export default { title: 'FoodCard' };

const props = {
    batches: Batches,
    handleClick: () => console.log('fired'),
    margin: '1rem 0 0 1rem',
    name: 'Carrots',
    ownerPhoto: User.photo
};

export const normal = () => <FoodCard {...props} />;
export const selected = () => <FoodCard {...props} isSelected />;
