import React from 'react';
import { CategoryFilterMobile, CategoryFilterMobileProps } from '.';

export default { title: 'CategoryFilterMobile' };

const props: CategoryFilterMobileProps = {
    selected: 'all',
    setSelected: (category: string) => console.log(category)
};

export const normal = () => <CategoryFilterMobile {...props} />;
export const selected = () => <CategoryFilterMobile {...props} selected="fruit" />;
