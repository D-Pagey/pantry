import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Media from 'react-media';
import ProviderAuth from '../ProviderAuth';
import Header from '../Header';
import Routes from '../Routes';
import MobileNavbar from '../MobileNavbar';
import * as S from './styles';

const App = (): JSX.Element => (
    <ProviderAuth>
        <BrowserRouter>
            <S.Wrapper>
                <S.GlobalStyle />

                <Header />

                <Routes />

                <Media query="(max-width: 475px)" render={(): JSX.Element => <MobileNavbar />} />
            </S.Wrapper>
        </BrowserRouter>
    </ProviderAuth>
);

export default App;
