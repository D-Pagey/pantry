import React from 'react';
import { storiesOf } from '@storybook/react';
import CategoryCard from '.';

const props = {
  category: 'Meat',
  quantity: 2,
};

storiesOf('CategoryCard', module).add('default', () => <CategoryCard {...props} />);
