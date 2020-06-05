import React, { FC, ReactNode } from 'react';
import * as S from './styles';

type ButtonProps = {
    children: ReactNode;
    onClick?: Function;
    type?: string;
};

export const Button: FC<ButtonProps> = ({ children, onClick, type, ...props }) => {
    return (
        <S.Button onClick={onClick} type={type} {...props}>
            {children}
        </S.Button>
    );
};
