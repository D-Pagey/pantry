import 'react-toastify/dist/ReactToastify.css';
import { FC, useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMediaQuery } from 'react-responsive';

import { mediaQuery } from '../../tokens';
import { AuthContext } from '../ProviderAuth';
import { BurgerMenu } from '../BurgerMenu';
import { AuthenticatedRoutes } from '../AuthenticatedRoutes';
import { UnauthenticatedRoutes } from '../UnauthenticatedRoutes';
import * as S from './styles';

toast.configure({
    position: 'top-right'
});

export const App: FC = () => {
    const { user } = useContext(AuthContext);
    const isTabletOrLarger = useMediaQuery({
        query: mediaQuery.tablet
    });

    return (
        <BrowserRouter>
            {!isTabletOrLarger && <BurgerMenu />}

            <S.GlobalStyle />

            {user ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
        </BrowserRouter>
    );
};
