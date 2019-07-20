import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { db } from '../../services';
import Header from '../Header';
import * as S from './styles';

const App = () => {
    db.collection('test')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.data().food}`);
            });
        });

    return (
        <BrowserRouter>
            <S.Wrapper>
                <S.GlobalStyle />

                <Header />
            </S.Wrapper>
        </BrowserRouter>
    );
};

export default App;
