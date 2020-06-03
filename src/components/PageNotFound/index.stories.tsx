import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { PageNotFound } from '.';

export default { title: 'PageNotFound' };

export const normal = () => (
    <MemoryRouter>
        <PageNotFound />
    </MemoryRouter>
);
