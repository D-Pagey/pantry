import React, { FC } from 'react';

type CircleIconProps = {
    colour: string;
    margin?: string;
};

export const CircleIcon: FC<CircleIconProps> = ({ colour, margin }) => (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin }}>
        <circle cx="4" cy="4" r="4" fill={colour} />
    </svg>
);
