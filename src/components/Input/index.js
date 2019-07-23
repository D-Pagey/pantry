import React from 'react';
import { string } from 'prop-types';
import * as S from './styles';

const Input = ({ testId }) => <S.Input data-testid={testId} type="text" />;

Input.propTypes = {
    testId: string.isRequired
};

export default Input;
