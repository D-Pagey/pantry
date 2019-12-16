import React, { useContext, useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { AuthContext } from '../ProviderAuth';
import * as S from './styles';

const BurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthed } = useContext(AuthContext);

    const handleStateChange = (state) => setIsOpen(state.isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <Menu
            isOpen={isOpen}
            onStateChange={handleStateChange}
            styles={S.MenuStyles}
            disableAutoFocus
            right
        >
            <S.NavLink to="/" onClick={closeMenu}>
                Home
            </S.NavLink>
            {isAuthed ? (
                <>
                    <S.NavLink to="/add" onClick={closeMenu}>
                        Add Food
                    </S.NavLink>
                    <S.NavLink to="/profile" onClick={closeMenu}>
                        Profile
                    </S.NavLink>
                    <S.Button onClick={closeMenu}>Sign Out</S.Button>
                </>
            ) : (
                <S.NavLink to="/sign-in" onClick={closeMenu}>
                    Sign In
                </S.NavLink>
            )}
        </Menu>
    );
};

export default BurgerMenu;
