import React from 'react';
import { string } from 'prop-types';
import * as S from './styles';

const Input = ({ error, label, testId }) => {
    return (
        <S.Wrapper>
            {label && <S.Label htmlFor={testId}>{label}</S.Label>}

            <S.Input id={testId} data-testid={testId} type="text" />

            {error && <S.Error>{error}</S.Error>}
        </S.Wrapper>
    );
};

Input.propTypes = {
    error: string,
    label: string,
    testId: string.isRequired
};

Input.defaultProps = {
    error: '',
    label: ''
};

export default Input;
