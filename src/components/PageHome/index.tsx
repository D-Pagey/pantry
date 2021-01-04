import React, { FC } from 'react';
import { Link } from 'react-router-dom';

// import { DatabaseFoodType } from '../../types';
// import { db } from '../../services';
import { Layout } from '../Layout';
import { Button } from '../Button';
import AlexaImage from './assets/alexa.svg';
import EatingTogetherImage from './assets/eating-together.svg';
import FoodListImage from './assets/food-list.svg';
import ScreenshotImage from './assets/screenshot.png';
import * as S from './styles';
// import { updateFridge } from './utils';

export const PageHome: FC = () => {
    const updateDatabase = () => {
        // Create a reference to the SF doc.
        // const householdRef = db.collection('households').doc('CslPbikx8p0WmgZefsy4');
        // // Uncomment to initialize the doc.
        // // sfDocRef.set({ population: 0 });
        // return db
        //     .runTransaction(function (transaction) {
        //         // This code may get re-run multiple times if there are conflicts.
        //         return transaction.get(householdRef).then(function (doc) {
        //             if (!doc.exists) {
        //                 throw 'Document does not exist!';
        //             }
        //             const originalFridge = doc.data()?.fridge;
        //             const result = updateFridge(originalFridge);
        //             console.log({ result });
        //             // transaction.update(householdRef, { population: newPopulation });
        //         });
        //     })
        //     .then(function () {
        //         console.log('Transaction successfully committed!');
        //     })
        //     .catch(function (error) {
        //         console.log('Transaction failed: ', error);
        //     });
    };

    return (
        <Layout hideTitle>
            <S.Wrapper data-testid="pageHome">
                <button onClick={updateDatabase}>update database</button>

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
