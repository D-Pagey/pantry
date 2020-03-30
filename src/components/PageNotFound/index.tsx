import React from 'react';
import * as S from './styles';

export const PageNotFound = (): JSX.Element => (
    <div>
        <S.Title>404 - This page does not exist</S.Title>
        <S.RouterLink to="/">Return Home</S.RouterLink>
    </div>
);
