import React, { useContext, useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { FirebaseContext } from '../ProviderFirebase';
import * as S from './styles';

const BurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthed, signOut } = useContext(FirebaseContext);

    const handleStateChange = (state) => setIsOpen(state.isOpen);
    const closeMenu = () => setIsOpen(false);
    const menuSignOut = () => {
        signOut();
        closeMenu();
    };

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
                    <S.NavLink
                        to="/profile"
                        onClick={closeMenu}
                        data-testid="burgerMenuProfileLink"
                    >
                        Profile
                    </S.NavLink>
                    <S.Button onClick={menuSignOut} data-testid="burgerMenuSignOut">
                        Sign Out
                    </S.Button>
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
