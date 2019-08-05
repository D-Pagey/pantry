import React from 'react';
import { func, string } from 'prop-types';
import * as S from './styles';

const Input = ({ error, label, name, onBlur, onChange, testId, value }) => {
    return (
        <S.Wrapper>
            {label && <S.Label htmlFor={testId}>{label}</S.Label>}

            <S.Input
                id={testId}
                data-testid={testId}
                type="text"
                name={name}
                onBlur={onBlur}
                onChange={onChange}
                value={value}
            />

            {error && <S.Error>{error}</S.Error>}
        </S.Wrapper>
    );
};

Input.propTypes = {
    error: string,
    label: string,
    name: string,
    onBlur: func,
    onChange: func.isRequired,
    testId: string,
    value: string.isRequired
};

Input.defaultProps = {
    error: '',
    label: '',
    name: '',
    onBlur: () => {},
    testId: ''
};

export default Input;
