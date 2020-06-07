import React from 'react';
import { FoodCard } from '.';

export default { title: 'FoodCard' };

const props = {
    name: 'Carrots',
    date: new Date()
};

export const normal = () => <FoodCard {...props} />;
