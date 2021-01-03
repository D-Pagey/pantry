import React, { FC } from 'react';
import * as S from './styles';

export type InputProps = {
    disabled?: boolean;
    margin?: string;
    name?: string;
    onBlur?: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange: (event: any) => void;
    placeholder?: string;
    testId?: string;
    value: string;
};

export const Input: FC<InputProps> = ({
    disabled,
    margin,
    name,
    onBlur,
    onChange,
    placeholder,
    testId = 'input',
    value,
    ...props
}) => (
    <S.Input
        data-testid={testId}
        disabled={disabled}
        id={testId}
        margin={margin}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        type="text"
        value={value}
        {...props}
    />
);
