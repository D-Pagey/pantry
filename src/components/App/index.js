import React from 'react';
import Header from '../Header';
import * as S from './styles';

function App() {
    return (
        <S.Wrapper>
            <S.GlobalStyle />

            <Header />

            <S.Title>Project Pantry</S.Title>
        </S.Wrapper>
    );
}

export default App;
