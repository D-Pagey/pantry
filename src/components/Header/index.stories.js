import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '.';

export default { title: 'Header' };

export const normal = () => (
    <MemoryRouter>
        <Header />
    </MemoryRouter>
);

export const withPageProps = () => (
    <MemoryRouter>
        <Header page="Add an item" />
    </MemoryRouter>
);
