import React from 'react';
import { storiesOf } from '@storybook/react';
import CategoryCard from '.';

const props = {
    colour: 'red'
};

storiesOf('CategoryCard', module).add('default', () => <CategoryCard {...props} />);
