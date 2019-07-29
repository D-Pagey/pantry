import React from 'react';
import { oneOf, string } from 'prop-types';
import * as S from './styles';

const Button = ({ children, testId, variant, width, ...props }) => {
    switch (variant) {
        case 'selected':
            return (
                <S.Selected data-testid={testId} width={width} {...props}>
                    {children}
                </S.Selected>
            );
        case 'unselected':
            return (
                <S.UnSelected data-testid={testId} width={width} {...props}>
                    {children}
                </S.UnSelected>
            );
        default:
            return (
                <S.Button data-testid={testId} width={width} {...props}>
                    {children}
                </S.Button>
            );
    }
};

Button.propTypes = {
    children: string.isRequired,
    testId: string,
    variant: oneOf(['', 'selected', 'unselected']),
    width: string
};

Button.defaultProps = {
    testId: '',
    variant: '',
    width: ''
};

export default Button;