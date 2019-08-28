import React, { useEffect, useState } from 'react';
import { storiesOf } from '@storybook/react';
import Dropdown from '.';

const options = [
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
];

// eslint-disable-next-line react/prop-types
const FakeForm = ({ error, label, preSelected }) => {
    const [selected, setSelected] = useState();

    useEffect(() => {
        if (preSelected) setSelected(preSelected);
    }, [preSelected]);

    return (
        <Dropdown
            error={error}
            options={options}
            label={label}
            selected={selected}
            setSelected={setSelected}
        />
    );
};

storiesOf('Dropdown', module)
    .add('with label', () => <FakeForm label="What category of food?" />)
    .add('without label', () => <FakeForm />)
    .add('preselected', () => <FakeForm preSelected={options[1]} />)
    .add('with error', () => <FakeForm preSelected={options[1]} error="Required" />);
