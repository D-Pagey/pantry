import React, { useContext, FC } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { Layout } from '../Layout';
import { AuthContext } from '../ProviderAuth';

type RouteProtectedProps = {
    path: string;
};

export const RouteProtected: FC<RouteProtectedProps> = ({ path, ...props }) => {
    const { isAuthed, isCheckingAuth } = useContext(AuthContext);

    if (isCheckingAuth) {
        return (
            <Layout isLoading>
                <div />
            </Layout>
        );
    }

    if (!isCheckingAuth && !isAuthed) return <Redirect to="/sign-in" />;

    return <Route path={path} {...props} />;
};
