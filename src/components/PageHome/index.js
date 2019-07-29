import React, { useContext } from 'react';
import { FirebaseContext } from '../ProviderFirebase';
import FoodGrid from '../FoodGrid';
import * as S from './styles';

const PageHome = () => {
    const { value, loading } = useContext(FirebaseContext);

    return <S.Wrapper>{loading ? <p>Loading...</p> : <FoodGrid data={value.fridge} />}</S.Wrapper>;
};

export default PageHome;
