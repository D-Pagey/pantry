/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { storiesOf } from '@storybook/react';
import SingleSelect from '.';

const options = [
    {
        label: 'Option 1',
        value: 'option 1'
    },
    {
        label: 'Option 2',
        value: 'option 2'
    },
    {
        label: 'Option 3',
        value: 'option 3'
    },
    {
        label: 'Option 4',
        value: 'option 4'
    }
];

const SingleSelectWrapper = ({ label, preSelected }) => {
    const [state, setState] = useState([]);
    console.log(state);

    useEffect(() => preSelected && setState(preSelected), [preSelected]);

    return <SingleSelect label={label} options={options} selected={state} setSelected={setState} />;
};

storiesOf('SingleSelect', module)
    .add('default', () => <SingleSelectWrapper label="What options would you like to select?" />)
    .add('preselected', () => (
        <SingleSelectWrapper
            label="What options would you like to select?"
            preSelected={{
                label: 'Option 3',
                value: 'option 3'
            }}
        />
    ))
    .add('no label', () => <SingleSelectWrapper />);
