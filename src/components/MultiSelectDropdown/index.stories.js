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

const Wrapper = (props) => {
    const [values, setValues] = useState([options[0]]);

    return <MultiSelectDropdown setValues={setValues} options={options} value={values} {...props} />;
};

storiesOf('MultiSelectDropdown', module)
    .add('default', () => <Wrapper />)
    .add('with label', () => <Wrapper label="Food categories" />)
    .add('with error', () => <Wrapper error="Required" />)
    .add('with label & error', () => <Wrapper label="Food categories" error="Required" />);
