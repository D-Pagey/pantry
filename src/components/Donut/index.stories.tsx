import React from 'react';
import { addDays } from 'date-fns';

import { Donut } from '.';

const props = {
    date: new Date()
};

export default { title: 'Donut' };

export const variety = () => (
    <div style={{ display: 'flex' }}>
        <Donut {...props} date={addDays(new Date(), -1)} />
        <Donut {...props} date={new Date()} />
        <Donut {...props} date={addDays(new Date(), 1)} />
        <Donut {...props} date={addDays(new Date(), 2)} />
        <Donut {...props} date={addDays(new Date(), 3)} />
        <Donut {...props} date={addDays(new Date(), 4)} />
        <Donut {...props} date={addDays(new Date(), 50)} />
        <Donut {...props} date={addDays(new Date(), 600)} />
    </div>
);
