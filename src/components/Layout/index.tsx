import React, { FC, ReactNode } from 'react';
import { Header } from '../Header';
import * as S from './styles';

type LayoutProps = {
    children: ReactNode;
    title?: string;
};

export const Layout: FC<LayoutProps> = ({ children, title }) => (
    <>
        <Header page={title} />

        <S.Wrapper>{children}</S.Wrapper>
    </>
);
