import React from 'react';
import { storiesOf } from '@storybook/react';
import { CategoryCard } from '.';

const props = {
    label: 'Meat',
    colour: 'red',
    count: 2
};

storiesOf('CategoryCard', module).add('default', () => <CategoryCard {...props} />);
