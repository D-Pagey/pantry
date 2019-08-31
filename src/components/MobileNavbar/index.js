import React from 'react';
import * as S from './styles';

const MobileNavbar = () => (
    <S.List data-testid="mobileNavbar">
        <S.Item>
            <S.StyledNavLink to="/" exact>
                Check Fridge
            </S.StyledNavLink>
        </S.Item>
        <S.Item>
            <S.StyledNavLink to="/add">Add Food</S.StyledNavLink>
        </S.Item>
    </S.List>
);

export default MobileNavbar;
