import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { Loading } from '../Loading';
import { AuthContext } from '../ProviderAuth';

export const RouteProtected = (props: any): JSX.Element => {
    const { isAuthed, isCheckingAuth } = useContext(AuthContext);

    if (isCheckingAuth) {
        return (
            <div data-testid="routeProtectedEmpty">
                <Loading isLoading />
            </div>
        );
    }
    if (!isCheckingAuth && !isAuthed) return <Redirect to="/sign-in" />;
    return <Route {...props} />;
};
