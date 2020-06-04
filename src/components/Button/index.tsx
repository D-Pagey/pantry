import React, { FC, MouseEvent } from 'react';
import * as S from './styles';

type ButtonTypes = {
    children: React.ReactNode;
    onClick?: (event: MouseEvent<HTMLButtonElement, MouseEvent<Element, MouseEvent>>) => void;
    testId?: string;
    variant?: string;
    width?: string;
};

export const Button: FC<ButtonTypes> = ({ children, testId, onClick, variant, width, ...props }) => {
    switch (variant) {
        case 'submit':
            return <button type="button">{children}</button>;

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
