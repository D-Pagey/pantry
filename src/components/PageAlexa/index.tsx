import React, { FC, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthContext } from '../ProviderAuth';
import { Layout } from '../Layout';
import { Button } from '../Button';

export const PageAlexa: FC = () => {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        // @ts-ignore
        window.onAmazonLoginReady = () => {
            // @ts-ignore
            return amazon.Login.setClientId('amzn1.application-oa2-client.a239a53e644d488cb584d90b1b5550ed');
        };
    }, []);

    useEffect(() => {
        const amazonRootDiv = document.getElementById('amazon-root');

        const appendLink = () => {
            const a = document.createElement('script');
            a.type = 'text/javascript';
            a.async = true;
            a.id = 'amazon-login-sdk';
            a.src = 'https://assets.loginwithamazon.com/sdk/na/login1.js';
            // @ts-ignore
            amazonRootDiv.appendChild(a);
        };

        if (amazonRootDiv) {
            appendLink();
        }
    }, []);

    const handleLoginWithAmazon = () => {
        const options = {
            scope: 'profile',
            scope_data: {
                profile: { essential: false }
            }
        };

        // @ts-ignore
        amazon.Login.authorize(options, '/alexa');
        return false;
    };

    return (
        <Layout title="Link to Alexa">
            <div id="amazon-root" />
            <p>Hey, link your Pantry with Alexa and you can ask: </p>

            <ul>
                <li>What should I eat today?</li>
                <li>Add Chicken, Cucumber and Yoghurt</li>
                <li>Remove humous</li>
                <li>Who&apos;s is this Salmon?</li>
            </ul>

            <Button onClick={handleLoginWithAmazon}>Link Alexa Account</Button>
        </Layout>
    );
};
