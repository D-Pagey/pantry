import React, { FC, ReactNode } from 'react';
import * as S from './styles';

type ButtonProps = {
    children: ReactNode;
    disabled?: boolean;
    onClick?: Function;
    type?: string;
};

export const Button: FC<ButtonProps> = ({ children, disabled, onClick, type, ...props }) => {
    return (
        <S.Button onClick={onClick} disabled={disabled} type={type} {...props}>
            {children}
        </S.Button>
    );
};
