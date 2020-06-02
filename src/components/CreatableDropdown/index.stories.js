import React, { useEffect, useState } from 'react';
import { CreatableDropdown } from '.';

const options = ['purple', 'orange', 'yellow', 'green'];

const FakeForm = ({ error, label, preSelected }) => {
    const [selected, setSelected] = useState();

    useEffect(() => {
        if (preSelected) setSelected(preSelected);
    }, [preSelected]);

    return (
        <CreatableDropdown error={error} options={options} label={label} setSelected={setSelected} value={selected} />
    );
};

export default { title: 'CreatableDropdown' };

export const withLabel = () => <FakeForm label="What category of food?" />;

export const withoutLabel = () => <FakeForm />;