import React, { FC, ReactNode } from 'react';

import { Loading } from '../Loading';
import { Header } from '../Header';
import * as S from './styles';

type LayoutProps = {
    children: ReactNode;
    isLoading?: boolean;
    title?: string;
};

export const Layout: FC<LayoutProps> = ({ children, isLoading, title }) => (
    <>
        <Header page={title} />

        <S.Wrapper>{isLoading ? <Loading isLoading /> : children}</S.Wrapper>
    </>
);
