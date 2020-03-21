import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FirebaseContext } from '../ProviderFirebase';
import CategoryList from '../CategoryList';
import Loading from '../Loading';
import Button from '../Button';
import * as S from './styles';

const PageHome = (): JSX.Element => {
    const { categoryCounts, expiringFood, isAuthed, isCheckingAuth } = useContext(FirebaseContext);

    useEffect(() => {
        if (expiringFood.length > 0) {
            toast.warn(
                `You have ${expiringFood.length} item${expiringFood.length > 1 &&
                    's'} expiring in the next 2 days!`
            );
        }
    }, [expiringFood]);

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
