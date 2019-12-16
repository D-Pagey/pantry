import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ProviderFirebase from '../ProviderFirebase';
import BurgerMenu from '../BurgerMenu';
import Routes from '../Routes';
import * as S from './styles';

const App = (): JSX.Element => (
    <ProviderFirebase>
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
    </ProviderFirebase>
);

export default App;
