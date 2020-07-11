import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProviderAuth } from '../ProviderAuth';
import { BurgerMenu } from '../BurgerMenu';
import { Routes } from '../Routes';
import * as S from './styles';

toast.configure({
    position: 'bottom-right'
});

export const App = (): JSX.Element => (
    <ProviderAuth>
        <BrowserRouter>
            <BurgerMenu />

            <S.GlobalStyle />

            <Routes />
        </BrowserRouter>
    </ProviderAuth>
);
