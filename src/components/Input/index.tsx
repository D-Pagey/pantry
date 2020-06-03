import React, { FC } from 'react';
import { FormLabel } from '../FormLabel';
import { FormError } from '../FormError';
import * as S from './styles';

type InputTypes = {
    error?: string;
    label?: string;
    name?: string;
    onBlur?: Function;
    onChange: Function;
    placeholder?: string;
    testId?: string;
    value: string;
};

export const Input: FC<InputTypes> = ({ error, label, name, onBlur, onChange, placeholder, testId, value }) => (
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

        {error && <FormError>{error}</FormError>}
    </S.Wrapper>
);
