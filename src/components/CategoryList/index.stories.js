import React from 'react';
import { storiesOf } from '@storybook/react';
import CategoryList from '.';

const props = {
    categories: [
        { category: 'Meat', quantity: 2 },
        { category: 'Fish', quantity: 3 },
        { category: 'Vegetables', quantity: 5 }
    ]
};

storiesOf('CategoryList', module).add('default', () => <CategoryList {...props} />);
