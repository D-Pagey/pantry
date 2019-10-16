/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { storiesOf } from '@storybook/react';
import SingleSelect from '.';

const options = [
    {
        label: 'Option 1',
        value: 1
    },
    {
        label: 'Option 2',
        value: 2
    },
    {
        label: 'Option 3',
        value: 3
    },
    {
        label: 'Option 4',
        value: 4
    }
];

const SingleSelectWrapper = ({ label, preSelected }) => {
    const [state, setState] = useState();

    useEffect(() => preSelected && setState(preSelected), [preSelected]);

    return (
        <SingleSelect
            label={label}
            options={options}
            selected={state}
            setSelected={(option) => setState(option.value)}
        />
    );
};

storiesOf('SingleSelect', module)
    .add('default', () => <SingleSelectWrapper label="What options would you like to select?" />)
    .add('preselected', () => (
        <SingleSelectWrapper label="What options would you like to select?" preSelected={3} />
    ))
    .add('no label', () => <SingleSelectWrapper />);
