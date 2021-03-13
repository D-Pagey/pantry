import { FC, ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive';

import { mediaQuery } from '../../tokens';
import { Loading } from '../Loading';
import { Header } from '../Header';
import * as S from './styles';

type LayoutProps = {
    children?: ReactNode;
    isLoading?: boolean;
    title?: string;
    hideTitle?: boolean;
};

export const Layout: FC<LayoutProps> = ({ children, isLoading, title, hideTitle }) => {
    const isTabletOrLarger = useMediaQuery({
        query: mediaQuery.tablet
    });

    return (
        <>
            <Header page={isTabletOrLarger ? undefined : title} />

            <S.Wrapper>
                {isLoading ? (
                    <Loading isLoading />
                ) : (
                    <>
                        {isTabletOrLarger && !hideTitle && <S.Title>{title}</S.Title>}

                        {children}
                    </>
                )}
            </S.Wrapper>
        </>
    );
};
