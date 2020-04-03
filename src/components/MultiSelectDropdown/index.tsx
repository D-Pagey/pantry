import React from 'react';
import CreatableSelect from 'react-select/creatable';
import { ValueType } from 'react-select';
import { FormLabel } from '../FormLabel';
import { FormError } from '../FormError';
import * as S from './styles';

type ValuesType = {
    label: string;
    value: string;
    colour?: string;
    id?: string;
    count?: number;
};

type DropdownTypes = {
    error?: string;
    label?: string;
    options: ValuesType[];
    setValues: Function;
    value: ValuesType[];
};

export const MultiSelectDropdown = ({ error, label, options, setValues, value }: DropdownTypes): JSX.Element => {
    const handleChange = (newValue: any, actionMeta: any): void => {
        console.log(actionMeta);
        if (actionMeta.action === 'create-option') {
            console.log({ newValue: newValue[newValue.length - 1] });
        }

        return setValues(newValue);
    };

    return (
        <S.Wrapper>
            {label && <FormLabel>{label}</FormLabel>}

            <CreatableSelect isMulti onChange={handleChange} options={options} value={value} />

            {error && <FormError>{error}</FormError>}
        </S.Wrapper>
    );
};
