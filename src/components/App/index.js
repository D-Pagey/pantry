import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Media from 'react-media';
import ProviderFirebase from '../ProviderFirebase';
import Header from '../Header';
import PageHome from '../PageHome';
import AddFoodForm from '../AddFoodForm';
import MobileNavbar from '../MobileNavbar';
import FoodGrid from '../FoodGrid';
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
                        <Route path="/add" component={AddFoodForm} />
                        <Route path="/:category" component={FoodGrid} />
                    </Switch>

                    <Media query="(max-width: 475px)" render={() => <MobileNavbar />} />
                </S.Wrapper>
            </BrowserRouter>
        </ProviderFirebase>
    );
};

export default App;
