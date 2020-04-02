import React from 'react';
import * as S from './styles';

type ErrorTypes = {
    children: React.ReactNode;
};

export const FormError = ({ children, ...props }: ErrorTypes): JSX.Element => <S.Error {...props}>{children}</S.Error>;
