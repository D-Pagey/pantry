import React, { useContext } from 'react';
import { FirebaseContext } from '../ProviderFirebase';
import CategoryList from '../CategoryList';
import * as S from './styles';

const PageHome = (): JSX.Element => {
    const { categoryCounts, isAuthed } = useContext(FirebaseContext);

    return (
        <S.Wrapper data-testid="pageHome">
            {isAuthed && <CategoryList categoryCounts={categoryCounts} />}
        </S.Wrapper>
    );
};

export default PageHome;
