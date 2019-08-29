import React, { useContext } from 'react';
import { FirebaseContext } from '../ProviderFirebase';
import FoodGrid from '../FoodGrid';
import * as S from './styles';

const PageHome = () => {
    const { fridge, loading } = useContext(FirebaseContext);

    return (
        <S.Wrapper>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <FoodGrid data={fridge} />
                </div>
            )}
        </S.Wrapper>
    );
};

export default PageHome;
