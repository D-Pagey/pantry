import React from 'react';
import { storiesOf } from '@storybook/react';
import Grid from '.';

const props = {
    data: [
        {
            category: 'meat',
            name: 'chicken',
            servings: 2
        },
        {
            category: 'fish',
            name: 'salmon',
            servings: 1
        },
        {
            category: 'vegetables',
            name: 'carrots',
            servings: 3
        }
    ]
};

storiesOf('Grid', module).add('default', () => <Grid {...props} />);
