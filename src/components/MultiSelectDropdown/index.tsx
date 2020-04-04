import React from 'react';
import CreatableSelect from 'react-select/creatable';
import { v4 as uuidv4 } from 'uuid';
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
        if (actionMeta.action === 'create-option') {
            // remove isNew prop
            const { __isNew__, ...rest } = newValue[newValue.length - 1];

            const addedValue = {
                ...rest,
                colour: 'black',
                count: 0,
                id: uuidv4()
            };

            // remove original new value before added the amended new value
            return setValues([...newValue.slice(0, newValue.length - 1), addedValue]);
        }

        return setValues(newValue);
    };

    return (
        <S.Wrapper>
            {label && <FormLabel htmlFor={label}>{label}</FormLabel>}

            <CreatableSelect inputId={label} isMulti onChange={handleChange} options={options} value={value} />

            {error && <FormError>{error}</FormError>}
        </S.Wrapper>
    );
};
