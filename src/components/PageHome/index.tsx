import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button';
import * as S from './styles';

export const PageHome = (): JSX.Element => {
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
        </S.Wrapper>
    );
};
