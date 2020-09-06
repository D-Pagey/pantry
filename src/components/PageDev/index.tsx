import React, { FC, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthContext } from '../ProviderAuth';
import { Layout } from '../Layout';

export const PageDev: FC = () => {
    const { user } = useContext(AuthContext);

    if (user?.email !== 'dan.page91@gmail.com') return <Redirect to="/" />;

    return (
        <Layout title="Super secret">
            <h1>Test shit out</h1>
        </Layout>
    );
};
