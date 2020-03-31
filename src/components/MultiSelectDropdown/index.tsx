import React from 'react';
import CreatableSelect from 'react-select/creatable';

type ValuesType = {
    label: string;
    value: string;
    colour?: string;
    id?: string;
    count?: number;
};

type DropdownTypes = {
    options: ValuesType[];
    setValues: Function;
    value: ValuesType[];
};

export const MultiSelectDropdown = ({ options, setValues, value }: DropdownTypes): JSX.Element => {
    const handleChange = (newValue: any): void => {
        return setValues(newValue);
    };

    return <CreatableSelect isMulti onChange={handleChange} options={options} value={value} />;
};
