import React from 'react';
import * as S from './styles';

type LabelTypes = {
    children: React.ReactNode;
};

export const FormLabel = ({ children }: LabelTypes): JSX.Element => <S.Label>{children}</S.Label>;
