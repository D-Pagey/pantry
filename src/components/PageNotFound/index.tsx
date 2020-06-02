import React, { FC } from 'react';
import { Header } from '../Header';
import * as S from './styles';

export const PageNotFound: FC = () => (
    <div>
        <Header page="Not found" />
        <S.Title>404 - This page does not exist</S.Title>
        <S.RouterLink to="/">Return Home</S.RouterLink>
    </div>
);
