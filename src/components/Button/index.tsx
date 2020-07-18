import React, { FC, ReactNode } from 'react';
import * as S from './styles';

type ButtonProps = {
    children: ReactNode;
    disabled?: boolean;
    margin?: string;
    onClick?: Function;
    secondary?: boolean;
    size?: 'sm' | 'm' | 'l';
    type?: string;
};

export const Button: FC<ButtonProps> = ({ children, disabled, secondary, ...props }) => {
    if (disabled) {
        return (
            <S.DisabledButton disabled={disabled} {...props}>
                {children}
            </S.DisabledButton>
        );
    }

    if (secondary) {
        return <S.SecondaryButton {...props}>{children}</S.SecondaryButton>;
    }

    return <S.Button {...props}>{children}</S.Button>;
};
