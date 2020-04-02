import React from 'react';
import { func, string } from 'prop-types';
import { FormLabel } from '../FormLabel';
import * as S from './styles';

type props = {
    error: string;
    label: string;
    name: string;
    onBlur: Function;
    onChange: Function;
    placeholder: string;
    testId: string;
    value: string;
};

export const Input = ({ error, label, name, onBlur, onChange, placeholder, testId, value }: props): JSX.Element => (
    <S.Wrapper>
        {label && <FormLabel htmlFor={testId}>{label}</FormLabel>}

        <S.Input
            id={testId}
            data-testid={testId}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            placeholder={placeholder}
            type="text"
            value={value}
        />

        {error && <S.Error>{error}</S.Error>}
    </S.Wrapper>
);

Input.propTypes = {
    error: string,
    label: string,
    name: string,
    onBlur: func,
    onChange: func.isRequired,
    placeholder: string,
    testId: string,
    value: string.isRequired
};

Input.defaultProps = {
    error: '',
    label: '',
    name: '',
    onBlur: (): void => {},
    placeholder: '',
    testId: ''
};
