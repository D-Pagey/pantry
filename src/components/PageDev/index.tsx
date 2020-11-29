import React, { FC, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthContext } from '../ProviderAuth';
import { Layout } from '../Layout';
import { Button } from '../Button';

export const PageDev: FC = () => {
    const { user } = useContext(AuthContext);

    if (user?.email !== 'dan.page91@gmail.com') return <Redirect to="/" />;

    return (
        <Layout title="Super secret">
            <p>Hey, link your Pantry with Alexa and you can ask: </p>

            <ul>
                <li>What should I eat today?</li>
                <li>Add Chicken, Cucumber and Yoghurt</li>
                <li>Remove humous</li>
                <li>Who&apos;s is this Salmon?</li>
            </ul>

            <Button>Link Alexa Account</Button>
        </Layout>
    );
};
