import React from 'react';
import { arrayOf, func, shape, string } from 'prop-types';
import CreatableSelect from 'react-select/creatable';
import * as S from './styles';

const CreatableDropdown = ({ error, label, options, setSelected }) => {
    const handleChange = (newValue, actionMeta) => {
        const isSelected =
            actionMeta.action === 'select-option' || actionMeta.action === 'create-option';

        if (isSelected) {
            const formatted = { ...newValue, value: newValue.value.toLowerCase() };

            setSelected(formatted);
        }
    };

    return (
        <S.Wrapper>
            {label && <S.Label>{label}</S.Label>}

            <CreatableSelect isClearable onChange={handleChange} options={options} />

            {error && <S.Error>{error}</S.Error>}
        </S.Wrapper>
    );
};

CreatableDropdown.propTypes = {
    error: string,
    label: string,
    options: arrayOf(
        shape({
            color: string,
            label: string.isRequired,
            value: string.isRequired
        }).isRequired
    ).isRequired,
    setSelected: func.isRequired
};

CreatableDropdown.defaultProps = {
    error: '',
    label: ''
};

export default CreatableDropdown;
