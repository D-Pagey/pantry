import React, { FC, ReactNode } from 'react';
import * as S from './styles';

type ButtonProps = {
    children: ReactNode;
    disabled?: boolean;
    margin?: string;
    onClick?: Function;
    secondary?: boolean;
    type?: string;
};

export const Button: FC<ButtonProps> = ({ children, disabled, margin, onClick, secondary, type, ...props }) => {
    if (disabled) {
        return (
            <S.DisabledButton disabled={disabled} margin={margin} onClick={onClick} type={type} {...props}>
                {children}
            </S.DisabledButton>
        );
    }

    if (secondary) {
        return (
            <S.SecondaryButton onClick={onClick} margin={margin} type={type} {...props}>
                {children}
            </S.SecondaryButton>
        );
    }

    return (
        <S.Button onClick={onClick} margin={margin} type={type} {...props}>
            {children}
        </S.Button>
    );
};
