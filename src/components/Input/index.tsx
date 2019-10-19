import React from 'react';
import { func, string } from 'prop-types';
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

const Input = ({
    error,
    label,
    name,
    onBlur,
    onChange,
    placeholder,
    testId,
    value
}: props): JSX.Element => {
    return (
        <S.Wrapper>
            {label && <S.Label htmlFor={testId}>{label}</S.Label>}

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
};

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

export default Input;
