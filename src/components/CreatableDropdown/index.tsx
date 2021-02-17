/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import CreatableSelect from 'react-select/creatable';
import * as S from './styles';

export type CreatableDropdownProps = {
    options: { label: string; value: string }[];
    inputName: string;
    setSelected: (value: string) => void;
    error?: string;
    defaultValue?: string;
    placeholder?: string;
};

export const CreatableDropdown: FC<CreatableDropdownProps> = ({
    defaultValue,
    error,
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
        <S.Wrapper>
            <CreatableSelect
                defaultValue={getDefaultValue()}
                inputId={inputName}
                name={inputName}
                onChange={handleChange}
                options={options}
                placeholder={placeholder}
                {...props}
            />

            {error && <S.ErrorText>{error}</S.ErrorText>}
        </S.Wrapper>
    );
};
