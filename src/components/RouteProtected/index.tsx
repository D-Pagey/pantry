import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../ProviderAuth';

const RouteProtected = (props: any): JSX.Element => {
    const { isAuthed } = useContext(AuthContext);

    if (!isAuthed) return <Redirect to="/sign-in" />;
    return <Route {...props} />;
};

export default RouteProtected;
