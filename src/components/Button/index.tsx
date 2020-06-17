import React, { FC, ReactNode } from 'react';
import * as S from './styles';

type ButtonProps = {
    children: ReactNode;
    disabled?: boolean;
    onClick?: Function;
    secondary?: boolean;
    type?: string;
};

export const Button: FC<ButtonProps> = ({ children, disabled, onClick, secondary, type, ...props }) => {
    if (disabled) {
        return (
            <S.DisabledButton disabled onClick={onClick} type={type} {...props}>
                {children}
            </S.DisabledButton>
        );
    }

    if (secondary) {
        return (
            <S.SecondaryButton onClick={onClick} type={type} {...props}>
                {children}
            </S.SecondaryButton>
        );
    }

    return (
        <S.Button onClick={onClick} type={type} {...props}>
            {children}
        </S.Button>
    );
};
