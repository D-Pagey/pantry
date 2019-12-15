import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ProviderAuth from '../ProviderAuth';
import BurgerMenu from '../BurgerMenu';
import Routes from '../Routes';
import * as S from './styles';

const App = (): JSX.Element => (
    <ProviderAuth>
        <BrowserRouter>
            <BurgerMenu />

            <S.Wrapper>
                <S.GlobalStyle />

                <S.Link to="/">
                    <S.Title>Pantry</S.Title>
                </S.Link>

                <Routes />
            </S.Wrapper>
        </BrowserRouter>
    </ProviderAuth>
);

export default App;
