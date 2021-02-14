/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import CreatableSelect from 'react-select/creatable';

type CreatableDropdownProps = {
    defaultValue?: string;
    options: { label: string; value: string }[];
    inputName: string;
    placeholder?: string;
    setSelected: (value: string) => void;
};

export const CreatableDropdown: FC<CreatableDropdownProps> = ({
    defaultValue,
    options,
    placeholder,
    setSelected,
    inputName,
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
        <CreatableSelect
            defaultValue={getDefaultValue()}
            inputId={inputName}
            name={inputName}
            onChange={handleChange}
            options={options}
            placeholder={placeholder}
            {...props}
        />
    );
};
