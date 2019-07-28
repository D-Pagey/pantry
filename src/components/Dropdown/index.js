import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import Select from 'react-select';
import * as S from './styles';

const Dropdown = ({ label, options }) => {
    return (
        <S.Wrapper>
            {label && <S.Label>{label}</S.Label>}

            <Select options={options} isClearable isSearchable />
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
    ).isRequired
};

Dropdown.defaultProps = {
    label: ''
};

export default Dropdown;
