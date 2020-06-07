import React from 'react';
import { Layout } from '../Layout';
import { FoodCard } from '../FoodCard';

export const PageTest = () => (
    <Layout>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0 0' }}>
            <FoodCard date="14th May" name="Carrots" />
        </div>
    </Layout>
);
