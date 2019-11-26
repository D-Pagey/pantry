import React, { useContext } from 'react';
import { FirebaseContext } from '../ProviderFirebase';
import CategoryList from '../CategoryList';
import * as S from './styles';

const PageHome = (): JSX.Element => {
    const { loading, signIn, user } = useContext(FirebaseContext);

    return (
        <S.Wrapper>
            {user.name ? (
                <p>
                    {user.name}: {user.email}
                </p>
            ) : (
                <button onClick={signIn}>Sign In</button>
            )}
            {loading ? <p>Loading...</p> : <CategoryList />}
        </S.Wrapper>
    );
};

export default PageHome;
