import React, { useState } from 'react';
import { Layout } from '../Layout';
import { FoodCard } from '../FoodCard';
import { ExpiringPill } from '../ExpiringPill';

export const PageTest = () => {
    const [isExpiring, setIsExpiring] = useState(false);

    return (
        <Layout>
            <div style={{ margin: '2rem 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <FoodCard date={new Date()} name="Carrots" />

                <ExpiringPill handleClick={() => setIsExpiring(!isExpiring)} isEnabled={isExpiring} margin="1rem 0 0" />
            </div>
        </Layout>
    );
};
