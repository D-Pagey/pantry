import React, { useEffect, useState } from 'react';
import { storiesOf } from '@storybook/react';
import CreatableDropdown from '.';

const options = [
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' }
];

// eslint-disable-next-line react/prop-types
const FakeForm = ({ error, label, preSelected }) => {
    const [selected, setSelected] = useState();

    useEffect(() => {
        if (preSelected) setSelected(preSelected);
    }, [preSelected]);

    return (
        <CreatableDropdown
            error={error}
            options={options}
            label={label}
            selected={selected}
            setSelected={setSelected}
        />
    );
};

storiesOf('CreatableDropdown', module)
    .add('with label', () => <FakeForm label="What category of food?" />)
    .add('without label', () => <FakeForm />);
