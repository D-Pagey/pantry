import React, { FC } from 'react';
import * as S from './styles';

type InputTypes = {
    margin?: string;
    name?: string;
    onBlur?: Function;
    onChange: (event: any) => void;
    placeholder?: string;
    testId?: string;
    value: string;
};

export const Input: FC<InputTypes> = ({ margin, name, onBlur, onChange, placeholder, testId = 'input', value }) => (
    <S.Input
        data-testid={testId}
        id={testId}
        margin={margin}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        type="text"
        value={value}
    />
);
