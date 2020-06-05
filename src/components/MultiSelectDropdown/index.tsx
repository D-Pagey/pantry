import React, { FC } from 'react';
import CreatableSelect from 'react-select/creatable';
import { v4 as uuidv4 } from 'uuid';
import { CategoryType } from '../../types';
import * as S from './styles';

type DropdownProps = {
    id?: string;
    options: CategoryType[];
    setValues: (categories: CategoryType[]) => void;
    value: CategoryType[];
};

/**
 * Return a consistent array of values except for one __isNew__ flag
 */
export const MultiSelectDropdown: FC<DropdownProps> = ({ id, options, setValues, value }) => {
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
        <CreatableSelect
            inputId={id}
            isMulti
            onChange={handleChange}
            options={options}
            styles={S.colourStyles}
            value={value}
        />
    );
};
