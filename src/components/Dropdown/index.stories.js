import React from 'react';
import { storiesOf } from '@storybook/react';
import Dropdown from '.';

const props = {
    options: [
        {
            label: 'Meat',
            value: 'meat'
        },
        {
            label: 'Vegetables',
            value: 'vegetables'
        },
        {
            label: 'Fish',
            value: 'fish'
        }
    ]
};

storiesOf('Dropdown', module)
    .add('with label', () => <Dropdown {...props} label="What category of food?" />)
    .add('without label', () => <Dropdown {...props} />);
