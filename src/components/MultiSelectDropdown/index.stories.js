import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { MultiSelectDropdown } from '.';

const options = [
    {
        label: 'Meat',
        value: 'meat',
        colour: 'red',
        count: 0,
        id: '1'
    },
    {
        label: 'Fish',
        value: 'fish',
        colour: 'blue',
        count: 2,
        id: '2'
    },
    {
        label: 'Vegetables',
        value: 'vegetables',
        colour: 'green',
        count: 4,
        id: '3'
    }
];

const Wrapper = () => {
    const [values, setValues] = useState([options[0]]);

    return <MultiSelectDropdown setValues={setValues} options={options} value={values}/>;
};

storiesOf('MultiSelectDropdown', module).add('default', () => <Wrapper />);
