import React, { useState } from 'react';
import { MultiSelectDropdown } from '.';

const options = [
    {
        label: 'Meat',
        value: 'meat',
        name: 'meat',
        colour: 'red',
        count: 0,
        id: '1'
    },
    {
        label: 'Fish',
        value: 'fish',
        name: 'fish',
        colour: 'blue',
        count: 2,
        id: '2'
    },
    {
        label: 'Vegetables',
        value: 'vegetables',
        name: 'vegetables',
        colour: 'green',
        count: 4,
        id: '3'
    }
];

const Wrapper = (props: any) => {
    const [values, setValues] = useState([options[0]]);

    return <MultiSelectDropdown setValues={setValues} options={options} value={values} {...props} />;
};

export default { title: 'MultiSelectDropdown' };

export const normal = () => <Wrapper />;
