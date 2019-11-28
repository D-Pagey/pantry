import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Media from 'react-media';
import ProviderFirestore from '../ProviderFirestore';
import Header from '../Header';
import PageHome from '../PageHome';
import AddFoodForm from '../AddFoodForm';
import MobileNavbar from '../MobileNavbar';
import FoodTable from '../FoodTable';
import PageSignIn from '../PageSignIn';
import * as S from './styles';
import PageProfile from '../PageProfile';

const App = (): JSX.Element => {
    const [user, setUser] = useState({ name: '', email: '' });
    const [isAuthed, setIsAuthed] = useState(false);

    useEffect(() => {
        if (user.name) {
            setIsAuthed(true);
        } else {
            setIsAuthed(false);
        }
    }, [user.name]);

    return (
        <ProviderFirestore>
            <BrowserRouter>
                <S.Wrapper>
                    <S.GlobalStyle />

                    <Header isAuthed={isAuthed} name={user.name} />

                    <Switch>
                        <Route exact path="/" component={PageHome} />
                        <Route path="/add" component={AddFoodForm} />
                        <Route
                            path="/sign-in"
                            render={(props): JSX.Element => (
                                <PageSignIn {...props} isAuthed={isAuthed} setUser={setUser} />
                            )}
                        />
                        <Route
                            path="/profile"
                            render={(props): JSX.Element => (
                                <PageProfile {...props} name={user.name} email={user.email} />
                            )}
                        />
                        <Route path="/:category" component={FoodTable} />
                    </Switch>

                    <Media
                        query="(max-width: 475px)"
                        render={(): JSX.Element => <MobileNavbar />}
                    />
                </S.Wrapper>
            </BrowserRouter>
        </ProviderFirestore>
    );
};

export default App;
