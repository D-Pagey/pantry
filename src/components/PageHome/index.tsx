import React, { useContext } from 'react';
import { FirebaseContext } from '../ProviderFirebase';
import CategoryList from '../CategoryList';
import * as S from './styles';

const PageHome: React.FC = () => {
    const { loading } = useContext(FirebaseContext);

    return <S.Wrapper>{loading ? <p>Loading...</p> : <CategoryList />}</S.Wrapper>;
};

export default PageHome;
