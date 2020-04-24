import React from 'react';
import Icon from './icon.svg';
import * as S from './styles';

export const Navbar = (): JSX.Element => (
    <S.Wrapper>
        <S.Link to="/">
            <S.Image src={Icon} alt="icon" />
        </S.Link>

        <S.Link to="/">
            <S.Title>Pantry</S.Title>
        </S.Link>
    </S.Wrapper>
);
