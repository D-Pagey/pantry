import React, { useEffect, useState } from 'react';
import { storiesOf } from '@storybook/react';
import CreatableDropdown from '.';

const options = ['purple', 'orange', 'yellow', 'green'];

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
            setSelected={setSelected}
            value={selected}
        />
    );
};

storiesOf('CreatableDropdown', module)
    .add('with label', () => <FakeForm label="What category of food?" />)
    .add('without label', () => <FakeForm />);
