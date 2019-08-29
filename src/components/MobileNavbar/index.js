import React from 'react';
import { NavLink } from 'react-router-dom';
import * as S from './styles';

const MobileNavbar = () => (
    <S.List>
        <S.Item>
            <NavLink to="/">Check Fridge</NavLink>
        </S.Item>
        <S.Item>
            <NavLink to="/add">Add Food</NavLink>
        </S.Item>
    </S.List>
);

export default MobileNavbar;
