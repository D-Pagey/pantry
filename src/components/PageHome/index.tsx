import React, { useContext } from 'react';
import { FirestoreContext } from '../ProviderFirestore';
import CategoryList from '../CategoryList';
import * as S from './styles';

const PageHome = (): JSX.Element => {
    const { loading } = useContext(FirestoreContext);

    return <S.Wrapper>{loading ? <p>Loading...</p> : <CategoryList />}</S.Wrapper>;
};

export default PageHome;
