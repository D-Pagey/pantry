import React, { useEffect, useState } from 'react';
import { CreatableDropdown } from '.';

const options = ['purple', 'orange', 'yellow', 'green'];

const FakeForm = ({ preSelected }: any) => {
    const [selected, setSelected] = useState();

    useEffect(() => {
        if (preSelected) setSelected(preSelected);
    }, [preSelected]);

    return <CreatableDropdown options={options} setSelected={setSelected} value={selected} />;
};

export default { title: 'CreatableDropdown' };

export const normal = () => <FakeForm />;
