import React from 'react';
import { colours } from '.';

export default { title: 'Colours' };

export const all = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gridGap: '1rem' }}>
        {Object.entries(colours).map(([name, color]) => (
            <div key={name}>
                <p>{name}</p>
                <div style={{ width: 50, height: 50, backgroundColor: color }} />
            </div>
        ))}
    </div>
);
