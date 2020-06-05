import React, { FC } from 'react';
import * as S from './styles';

type InputTypes = {
    name?: string;
    onBlur?: Function;
    onChange: Function;
    placeholder?: string;
    testId?: string;
    value: string;
};

export const Input: FC<InputTypes> = ({ name, onBlur, onChange, placeholder, testId = 'input', value }) => (
    <S.Input
        data-testid={testId}
        id={testId}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        type="text"
        value={value}
    />
);
