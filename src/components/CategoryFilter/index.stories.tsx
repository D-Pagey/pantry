import React from 'react';
import { CategoryFilter, CategoryFilterProps } from '.';

export default { title: 'CategoryFilter' };

const props: CategoryFilterProps = {
    selected: 'all',
    setSelected: (category) => console.log(category)
};

export const normal = () => <CategoryFilter {...props} />;
export const selected = () => <CategoryFilter {...props} selected="fruit" />;
