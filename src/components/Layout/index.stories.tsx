import React from 'react';
import { Layout } from '.';

export default { title: 'Layout', component: Layout };

export const noTitle = (args: any) => <Layout {...args}>Chicken</Layout>;
