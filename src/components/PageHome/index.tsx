import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FirebaseContext } from '../ProviderFirebase';
import { Button } from '../Button';
import * as S from './styles';

export const PageHome = (): JSX.Element => {
    const { expiringCount } = useContext(FirebaseContext);
    const history = useHistory();

    useEffect(() => {
        if (expiringCount) {
            toast.error(`${expiringCount} expiring items`, { onClick: () => history.push('./food/expiring') });
        }
    }, [expiringCount, history]);

    return (
        <S.Wrapper data-testid="pageHome">
            <S.Title>Play With Your Food</S.Title>

            <S.Text>Stop wasting food and get creative with what you have.</S.Text>

            <S.Text>
                Pantry gives you the heads up when food is about to expire, reducing your waste and saving you money.
            </S.Text>

            <Link to="/categories">
                <Button>Get started for free</Button>
            </Link>

            <S.FeaturesWrapper>
                <S.SubTitle>Track what is in your fridge</S.SubTitle>
                <S.Description>Know what’s in your fridge making it easier to plan your next meal.</S.Description>

                <S.SubTitle>Get notified on expiring items</S.SubTitle>
                <S.Description>Clearly see and manage your food items that are about to expire.</S.Description>
            </S.FeaturesWrapper>
        </S.Wrapper>
    );
};
