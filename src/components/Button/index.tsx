import React, { FC } from 'react';
import * as S from './styles';

type ButtonTypes = {
    children: string;
    onClick?: Function;
    testId?: string;
    variant?: string;
    width?: string;
};

export const Button: FC<ButtonTypes> = ({ children, testId, variant, width, ...props }) => {
    switch (variant) {
        case 'submit':
            return (
                <S.Submit data-testid={testId} width={width} {...props}>
                    {children}
                </S.Submit>
            );

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
