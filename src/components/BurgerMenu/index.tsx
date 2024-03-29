import { FC, useContext, useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { FeedbackFish } from '@feedback-fish/react';

import { AuthContext } from '../ProviderAuth';
import * as S from './styles';

export const BurgerMenu: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, signOut } = useContext(AuthContext);

    const handleStateChange = (state: { isOpen: boolean }): void => setIsOpen(state.isOpen);
    const closeMenu = (): void => setIsOpen(false);
    const menuSignOut = (): void => {
        signOut();
        closeMenu();
    };

    return (
        <Menu isOpen={isOpen} onStateChange={handleStateChange} styles={S.MenuStyles} disableAutoFocus right>
            <S.NavLink to="/" onClick={closeMenu}>
                Home
            </S.NavLink>
            {user ? (
                <>
                    <S.NavLink to="/add" onClick={closeMenu}>
                        Add Food
                    </S.NavLink>
                    <S.NavLink to="/settings" onClick={closeMenu} data-testid="burgerMenuSettingsLink">
                        Settings
                    </S.NavLink>

                    <FeedbackFish projectId="ebf44b54be5b15" userId={user.email}>
                        <S.Item>Send feedback</S.Item>
                    </FeedbackFish>

                    <S.Button onClick={menuSignOut} data-testid="burgerMenuSignOut">
                        Sign Out
                    </S.Button>
                </>
            ) : (
                <>
                    <FeedbackFish projectId="ebf44b54be5b15">
                        <S.Item>Send feedback</S.Item>
                    </FeedbackFish>
                    <S.NavLink to="/sign-in" onClick={closeMenu}>
                        Sign In
                    </S.NavLink>
                </>
            )}
        </Menu>
    );
};
