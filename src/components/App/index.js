import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Media from 'react-media';
import { firebase } from '../../services';
import ProviderFirestore from '../ProviderFirestore';
import Header from '../Header';
import PageHome from '../PageHome';
import AddFoodForm from '../AddFoodForm';
import MobileNavbar from '../MobileNavbar';
import FoodTable from '../FoodTable';
import PageSignIn from '../PageSignIn';
import PageProfile from '../PageProfile';
import * as S from './styles';

const App = () => {
    const [user, setUser] = useState({ name: '', email: '', photo: '' });
    const [isAuthed, setIsAuthed] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setIsAuthed(true);
                setUser({
                    name: user.providerData[0].displayName,
                    email: user.providerData[0].email,
                    photo: user.providerData[0].photoURL
                });
            } else {
                setIsAuthed(false);
            }
        });
    }, []);

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
                            render={(props) => (
                                <PageSignIn {...props} isAuthed={isAuthed} setUser={setUser} />
                            )}
                        />
                        <Route
                            path="/profile"
                            render={(props) => (
                                <PageProfile
                                    {...props}
                                    isAuthed={isAuthed}
                                    name={user.name}
                                    email={user.email}
                                />
                            )}
                        />
                        <Route path="/:category" component={FoodTable} />
                    </Switch>

                    <Media query="(max-width: 475px)" render={() => <MobileNavbar />} />
                </S.Wrapper>
            </BrowserRouter>
        </ProviderFirestore>
    );
};

export default App;
