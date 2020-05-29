import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProviderFirebase } from '../ProviderFirebase';
import { BurgerMenu } from '../BurgerMenu';
import { Navbar } from '../Navbar';
import { Routes } from '../Routes';
import * as S from './styles';

toast.configure({
    position: 'bottom-right'
});

export const App = (): JSX.Element => (
    <ProviderFirebase>
        <BrowserRouter>
            <BurgerMenu />
            <Navbar />

            <S.Wrapper>
                <S.GlobalStyle />

                <Routes />
            </S.Wrapper>
        </BrowserRouter>
    </ProviderFirebase>
);
