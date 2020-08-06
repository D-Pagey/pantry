import 'react-toastify/dist/ReactToastify.css';
import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMediaQuery } from 'react-responsive';

import { ProviderAuth } from '../ProviderAuth';
import { BurgerMenu } from '../BurgerMenu';
import { Routes } from '../Routes';
import * as S from './styles';

toast.configure({
    position: 'bottom-right'
});

export const App: FC = () => {
    const isMobile = useMediaQuery({
        query: '(max-device-width: 760px)'
    });

    return (
        <ProviderAuth>
            <BrowserRouter>
                {isMobile && <BurgerMenu />}

                <S.GlobalStyle />

                <Routes />
            </BrowserRouter>
        </ProviderAuth>
    );
};
