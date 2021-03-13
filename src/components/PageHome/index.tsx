import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Layout } from '../Layout';
import { Button } from '../Button';
import AlexaImage from './assets/alexa.svg';
import EatingTogetherImage from './assets/eating-together.svg';
import FoodListImage from './assets/food-list.svg';
import ScreenshotImage from './assets/screenshot.png';
import * as S from './styles';

export const PageHome: FC = () => {
    return (
        <Layout hideTitle>
            <S.Wrapper data-testid="pageHome">
                <S.HeroWrapper>
                    <S.Title>Stop wasting food</S.Title>

                    <S.Screenshot src={ScreenshotImage} alt="screenshot of food page" />

                    <S.Text>Get creative with what you have before it expires.</S.Text>

                    <S.Text>
                        Pantry gives you the heads up when food is about to expire, reducing your waste and saving you
                        money.
                    </S.Text>

                    <Link to="/sign-in">
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

                <S.PositionedLink to="/sign-in">
                    <Button>Get started in 30 seconds</Button>
                </S.PositionedLink>
            </S.Wrapper>
        </Layout>
    );
};
