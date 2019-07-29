import React from 'react';
import { arrayOf, func, shape, string } from 'prop-types';
import Select from 'react-select';
import * as S from './styles';

const Dropdown = ({ label, options, selected, setSelected }) => {
    const handleChange = (value) => setSelected(value);

    return (
        <S.Wrapper>
            {label && <S.Label>{label}</S.Label>}

            <Select
                options={options}
                onChange={handleChange}
                value={selected}
                isClearable
                isSearchable
            />
        </S.Wrapper>
    );
};

Dropdown.propTypes = {
    label: string,
    options: arrayOf(
        shape({
            label: string.isRequired,
            value: string.isRequired
        }).isRequired
    ).isRequired,
    selected: shape({
        label: string,
        value: string
    }),
    setSelected: func.isRequired
};

Dropdown.defaultProps = {
    label: '',
    selected: {}
};

export default Dropdown;
