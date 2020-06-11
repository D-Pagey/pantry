import React, { useContext } from 'react';

import { FoodType } from '../../types';
import { Layout } from '../Layout';
import { FirebaseContext } from '../ProviderFirebase';
import { FoodCard } from '../FoodCard';

export const PageTest = () => {
    const { fridge } = useContext(FirebaseContext);

    return (
        <Layout>
            <div style={{ margin: '2rem 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {fridge.length > 0 &&
                    fridge.map((item: FoodType) => (
                        <FoodCard key={item.name} batches={item.batches} name={item.name} />
                    ))}
            </div>
        </Layout>
    );
};
