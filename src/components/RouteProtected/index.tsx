import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { Layout } from '../Layout';
import { AuthContext } from '../ProviderAuth';

// eslint-disable-next-line
export const RouteProtected = (props: any): JSX.Element => {
    const { isAuthed, isCheckingAuth } = useContext(AuthContext);

    if (isCheckingAuth) {
        return (
            <Layout isLoading>
                <div />
            </Layout>
        );
    }

    if (!isCheckingAuth && !isAuthed) return <Redirect to="/sign-in" />;

    return <Route {...props} />;
};
