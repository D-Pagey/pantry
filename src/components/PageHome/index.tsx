import React, { FC, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Layout } from '../Layout';
import { Button } from '../Button';
import AlexaImage from './assets/alexa.svg';
import EatingTogetherImage from './assets/eating-together.svg';
import FoodListImage from './assets/food-list.svg';
import ScreenshotImage from './assets/screenshot.png';
import * as S from './styles';

type PageHomeProps = {
    expiringCount?: number;
};

export const PageHome: FC<PageHomeProps> = ({ expiringCount }) => {
    const history = useHistory();

    useEffect(() => {
        if (expiringCount) {
            toast.error(`${expiringCount} expiring items`, { onClick: () => history.push('/food') });
        }
    }, [expiringCount, history]);

    return (
        <Layout hideTitle>
            <S.Wrapper data-testid="pageHome">
                <S.HeroWrapper>
                    <S.Title>Play With Your Food</S.Title>

                    <S.Screenshot src={ScreenshotImage} alt="screenshot of food page" />

                    <S.Text>Stop wasting food and get creative with what you have.</S.Text>

                    <S.Text>
                        Pantry gives you the heads up when food is about to expire, reducing your waste and saving you
                        money.
                    </S.Text>

                    <Link to="/food">
                        <Button>Get started in 30 seconds</Button>
                    </Link>
                </S.HeroWrapper>

                <S.FeaturesWrapper>
                    <S.SubTitle>Upcoming Features:</S.SubTitle>

                    <S.Feature>
                        <S.Image src={FoodListImage} alt="food list" />
                        <S.FeatureTitle>Get notified on expiring items</S.FeatureTitle>
                        <S.Description>
                            Receive reminders to your phone, watch, or laptop regarding food about to expire.
                        </S.Description>
                    </S.Feature>

                    <S.Feature>
                        <S.Image src={AlexaImage} alt="alexa" positionImageRight />
                        <S.FeatureTitle>Alexa, what should I eat today?</S.FeatureTitle>
                        <S.Description>
                            Ask Alexa what you have that is expiring, or add a list of items as you put your shopping
                            away.
                        </S.Description>
                    </S.Feature>

                    <S.Feature>
                        <S.Image src={EatingTogetherImage} alt="eating together" />
                        <S.FeatureTitle>Share food with friends</S.FeatureTitle>
                        <S.Description>
                            Have extra banana bread to share with friends? Want to borrow a housemates eggs? Send them a
                            quick notification
                        </S.Description>
                    </S.Feature>
                </S.FeaturesWrapper>

                <S.PositionedLink to="/food">
                    <Button>Get started in 30 seconds</Button>
                </S.PositionedLink>
            </S.Wrapper>
        </Layout>
    );
};
