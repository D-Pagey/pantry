import React, { useContext } from 'react';
import { AuthContext } from '../ProviderAuth';
import CategoryList from '../CategoryList';
import * as S from './styles';

type PageHomeTypes = {
    categoryCounts: { category: string; count: number }[];
};

const PageHome = ({ categoryCounts }: PageHomeTypes): JSX.Element => {
    const { isAuthed } = useContext(AuthContext);

    return (
        <S.Wrapper data-testid="pageHome">
            {isAuthed && <CategoryList categoryCounts={categoryCounts} />}
        </S.Wrapper>
    );
};

export default PageHome;
