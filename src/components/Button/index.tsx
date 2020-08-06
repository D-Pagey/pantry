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
    destructive?: boolean;
};

export const Button: FC<ButtonProps> = ({ children, disabled, secondary, destructive, ...props }) => {
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

    if (destructive) {
        return <S.DestructiveButton {...props}>{children}</S.DestructiveButton>;
    }

    return <S.Button {...props}>{children}</S.Button>;
};
