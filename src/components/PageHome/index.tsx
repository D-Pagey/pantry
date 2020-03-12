import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../ProviderFirebase';
import CategoryList from '../CategoryList';
import Loading from '../Loading';
import Button from '../Button';
import * as S from './styles';

const PageHome = (): JSX.Element => {
    const { categoryCounts, isAuthed, isCheckingAuth } = useContext(FirebaseContext);

    if (isCheckingAuth) return <Loading isLoading />;

    return (
        <S.Wrapper data-testid="pageHome">
            {isAuthed && <CategoryList categoryCounts={categoryCounts} />}

            <Link to="/add">
                <Button>Add Item</Button>
            </Link>
        </S.Wrapper>
    );
};

export default PageHome;
