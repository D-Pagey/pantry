import React, { FC } from 'react';
import CreatableSelect from 'react-select/creatable';
import { getFridgeNameOptions } from '../../utils';
import * as S from './styles';

type CreatableDropdownProps = {
    defaultValue?: string;
    options: string[];
    placeholder?: string;
    setSelected: (value: string) => void;
};

export const CreatableDropdown: FC<CreatableDropdownProps> = ({ defaultValue, options, placeholder, setSelected }) => {
    const handleChange = (value: any, action: any) => {
        const isSelected = action.action === 'select-option' || action.action === 'create-option';

        if (isSelected) {
            return setSelected(value.value);
        }

        return null;
    };

    return (
        <S.Wrapper>
            <CreatableSelect
                defaultValue={defaultValue ? getFridgeNameOptions([defaultValue]) : null}
                inputId="foodName"
                isClearable
                name="foodName"
                onChange={handleChange}
                options={getFridgeNameOptions(options)}
                placeholder={placeholder}
            />
        </S.Wrapper>
    );
};
