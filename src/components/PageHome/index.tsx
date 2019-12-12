import React from 'react';
import CategoryList from '../CategoryList';
import * as S from './styles';

type PageHomeTypes = {
    categoryCounts: { category: string; count: number }[];
};

const PageHome = ({ categoryCounts }: PageHomeTypes): JSX.Element => {
    return (
        <S.Wrapper data-testid="pageHome">
            <CategoryList categoryCounts={categoryCounts} />
        </S.Wrapper>
    );
};

export default PageHome;
