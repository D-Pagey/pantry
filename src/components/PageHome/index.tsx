import React, { FC, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AuthContext } from '../ProviderAuth';
import { Layout } from '../Layout';
import { Button } from '../Button';
import AlexaImage from './assets/alexa.svg';
import EatingTogetherImage from './assets/eating-together.svg';
import FoodListImage from './assets/food-list.svg';
import * as S from './styles';

type PageHomeProps = {
    expiringCount?: number;
};

export const PageHome: FC<PageHomeProps> = ({ expiringCount }) => {
    const { user } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        if (expiringCount) {
            toast.error(`${expiringCount} expiring items`, { onClick: () => history.push('/food') });
        }
    }, [expiringCount, history]);

    return (
        <Layout>
            {user?.email === 'dan.page91@gmail.com' && (
                <Link to="/alexa">
                    <Button>Link Alexa</Button>
                </Link>
            )}

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

                <S.Feature>
                    <S.Image src={AlexaImage} alt="alexa" />
                    <S.SubTitle>Hands free</S.SubTitle>
                    <S.Description>
                        Ask Alexa what you have that is expiring, or add a list of items as you put your shopping away.
                    </S.Description>
                </S.Feature>

                <S.Feature>
                    <S.Image src={FoodListImage} alt="food list" />
                    <S.SubTitle>Get notified on expiring items</S.SubTitle>
                    <S.Description>Clearly see and manage your food items that are about to expire.</S.Description>
                </S.Feature>

                <S.Feature>
                    <S.Image src={EatingTogetherImage} alt="eating together" />
                    <S.SubTitle>Share food with your household</S.SubTitle>
                    <S.Description>
                        Send a notification to other members of the household requesting to borrow their food. Easily
                        let other household members know that you have extras that need to be eaten!
                    </S.Description>
                </S.Feature>
            </S.Wrapper>
        </Layout>
    );
};
