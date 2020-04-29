import React from 'react';
import CreatableSelect from 'react-select/creatable';
import { v4 as uuidv4 } from 'uuid';

import { CategoryType } from '../../types';
import { FormLabel } from '../FormLabel';
import { FormError } from '../FormError';
import * as S from './styles';

type DropdownTypes = {
    error?: string;
    label?: string;
    options: CategoryType[];
    setValues: (categories: CategoryType[]) => void;
    value: CategoryType[];
};

/**
 * Return a consistent array of values except for one __isNew__ flag
 */
export const MultiSelectDropdown = ({ error, label, options, setValues, value }: DropdownTypes): JSX.Element => {
    const handleChange = (newValue: any, actionMeta: any): void => {
        if (actionMeta.action === 'create-option') {
            const originalAddedValue = newValue[newValue.length - 1];

            const addedValue = {
                ...originalAddedValue,
                name: originalAddedValue.value.toLowerCase(),
                colour: 'black',
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

            <CreatableSelect
                inputId={label}
                isMulti
                onChange={handleChange}
                options={options}
                styles={S.colourStyles}
                value={value}
            />

            {error && <FormError>{error}</FormError>}
        </S.Wrapper>
    );
};
