import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../ProviderFirebase';
import { CategoryList } from '../CategoryList';
import { Loading } from '../Loading';
import { Button } from '../Button';
import * as S from './styles';

export const PageCategories = (): JSX.Element => {
    const { isAuthed, isCheckingAuth } = useContext(FirebaseContext);

    if (isCheckingAuth)
        return (
            <S.Wrapper>
                <Loading isLoading />
            </S.Wrapper>
        );

    return (
        <S.Wrapper data-testid="pageCategories">
            {isAuthed && (
                <>
                    <CategoryList />
                    <Link to="/add">
                        <Button>Add Item</Button>
                    </Link>
                </>
            )}
        </S.Wrapper>
    );
};
