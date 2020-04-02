import React from 'react';
import * as S from './styles';

type LabelTypes = {
    children: React.ReactNode;
    htmlFor?: string;
};

export const FormLabel = ({ children, ...props }: LabelTypes): JSX.Element => <S.Label {...props}>{children}</S.Label>;
