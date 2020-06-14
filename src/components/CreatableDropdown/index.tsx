import React, { FC } from 'react';
import CreatableSelect from 'react-select/creatable';
import { getFridgeNameOptions } from '../../utils';
import * as S from './styles';

type CreatableDropdownProps = {
    options: string[];
    placeholder?: string;
    setSelected: (value: string) => void;
};

export const CreatableDropdown: FC<CreatableDropdownProps> = ({ options, placeholder, setSelected }) => {
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
                isClearable
                onChange={handleChange}
                options={getFridgeNameOptions(options)}
                placeholder={placeholder}
                name="foodName"
                inputId="foodName"
            />
        </S.Wrapper>
    );
};
