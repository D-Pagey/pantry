import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProviderFirebase from '../ProviderFirebase';
import BurgerMenu from '../BurgerMenu';
import Routes from '../Routes';
import * as S from './styles';

toast.configure({
    position: toast.POSITION.BOTTOM_RIGHT
});

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
