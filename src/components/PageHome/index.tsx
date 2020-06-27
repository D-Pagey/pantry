import React, { FC, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FirebaseContext } from '../ProviderFirebase';
import { Layout } from '../Layout';
import { Button } from '../Button';
import * as S from './styles';

export const PageHome: FC = () => {
    const { expiringCount } = useContext(FirebaseContext);
    const history = useHistory();

    useEffect(() => {
        if (expiringCount) {
            toast.error(`${expiringCount} expiring items`);
        }
    }, [expiringCount, history]);

    return (
        <Layout>
            <S.Wrapper data-testid="pageHome">
                <S.Title>Play With Your Food</S.Title>

                <S.Text>Stop wasting food and get creative with what you have.</S.Text>

                <S.Text>
                    Pantry gives you the heads up when food is about to expire, reducing your waste and saving you
                    money.
                </S.Text>

                <Link to="/food">
                    <Button>Get started for free</Button>
                </Link>

                <S.FeaturesWrapper>
                    <S.SubTitle>Get notified on expiring items</S.SubTitle>
                    <S.Description>Clearly see and manage your food items that are about to expire.</S.Description>

                    <S.SubTitle>Track wastage</S.SubTitle>
                    <S.Description>
                        One click track whether you ate or threw out food. Check out your household&apos;s wastage stats
                        on your profile page.
                    </S.Description>

                    <S.SubTitle>Share food with your household</S.SubTitle>
                    <S.Description>
                        Send a notification to other members of the household requesting to borrow their food. Easily
                        let other household members know that you have extras that need to be eaten!
                    </S.Description>
                </S.FeaturesWrapper>
            </S.Wrapper>
        </Layout>
    );
};
