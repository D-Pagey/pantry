import React from 'react';
import { Layout } from '.';

export default { title: 'Layout' };

export const noTitle = () => <Layout>Chicken</Layout>;
export const addFood = () => <Layout title="Add food">Chicken</Layout>;
