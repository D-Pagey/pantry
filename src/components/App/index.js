import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProviderFirebase from '../ProviderFirebase';
import Header from '../Header';
import PageHome from '../PageHome';
import * as S from './styles';

const App = () => {
    return (
        <ProviderFirebase>
            <BrowserRouter>
                <S.Wrapper>
                    <S.GlobalStyle />

                    <Header />

                    <Switch>
                        <Route exact path="/" component={PageHome} />
                    </Switch>
                </S.Wrapper>
            </BrowserRouter>
        </ProviderFirebase>
    );
};

export default App;
