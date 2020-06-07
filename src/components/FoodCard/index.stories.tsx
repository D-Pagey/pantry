import React from 'react';
import { FoodCard } from '.';

export default { title: 'FoodCard' };

const props = {
    name: 'Carrots',
    date: '14th May'
};

export const normal = () => <FoodCard {...props} />;
