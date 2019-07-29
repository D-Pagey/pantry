import React, { useEffect, useState } from 'react';
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

// eslint-disable-next-line react/prop-types
const FakeForm = ({ label, preSelected }) => {
    const [selected, setSelected] = useState();

    useEffect(() => {
        if (preSelected) setSelected(preSelected);
    }, [preSelected]);

    return <Dropdown {...props} label={label} selected={selected} setSelected={setSelected} />;
};

storiesOf('Dropdown', module)
    .add('with label', () => <FakeForm label="What category of food?" />)
    .add('without label', () => <FakeForm />)
    .add('preselected', () => <FakeForm preSelected={props.options[1]} />);
