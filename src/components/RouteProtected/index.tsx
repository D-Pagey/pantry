import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { FirebaseContext } from '../ProviderFirebase';

const RouteProtected = (props: any): JSX.Element => {
    const { isAuthed, isCheckingAuth } = useContext(FirebaseContext);

    if (isCheckingAuth) return <div data-testid="routeProtectedEmpty" />;
    if (!isCheckingAuth && !isAuthed) return <Redirect to="/sign-in" />;
    return <Route {...props} />;
};

export default RouteProtected;
