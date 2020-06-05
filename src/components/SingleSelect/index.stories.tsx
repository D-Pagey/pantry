import React, { useEffect, useState } from 'react';
import { SingleSelect } from '.';

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

const SingleSelectWrapper = ({ preSelected }: any) => {
    const [state, setState] = useState<number>();

    useEffect(() => preSelected && setState(preSelected), [preSelected]);

    return <SingleSelect options={options} selected={state} setSelected={(option: any) => setState(option.value)} />;
};

export default { title: 'SingleSelect' };

export const normal = () => <SingleSelectWrapper label="What options would you like to select?" />;

export const withPreselected = () => (
    <SingleSelectWrapper label="What options would you like to select?" preSelected={3} />
);
