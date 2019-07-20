import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';
import * as S from './styles';

function App() {
    return (
        <BrowserRouter>
            <S.Wrapper>
                <S.GlobalStyle />

                <Header />
            </S.Wrapper>
        </BrowserRouter>
    );
}

export default App;
