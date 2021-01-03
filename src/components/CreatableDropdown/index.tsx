/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react';
import CreatableSelect from 'react-select/creatable';
import * as S from './styles';

type CreatableDropdownProps = {
    defaultValue?: string;
    options: { label: string; value: string }[];
    placeholder?: string;
    setSelected: (value: string) => void;
};

export const CreatableDropdown: FC<CreatableDropdownProps> = ({
    defaultValue,
    options,
    placeholder,
    setSelected,
    ...props
}) => {
    const handleChange = (value: any, action: any) => {
        const isSelected = action.action === 'select-option' || action.action === 'create-option';

        if (isSelected) {
            return setSelected(value.value);
        }

        return null;
    };

    const getDefaultValue = () => {
        return options.filter((option) => option.value === defaultValue)[0];
    };

    return (
        <S.Wrapper {...props}>
            <CreatableSelect
                defaultValue={getDefaultValue()}
                inputId="foodName"
                isClearable
                name="foodName"
                onChange={handleChange}
                options={options}
                placeholder={placeholder}
            />
        </S.Wrapper>
    );
};
