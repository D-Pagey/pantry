import React, { FC } from 'react';

type DonutIconProps = {
    colour: string;
};

export const DonutIcon: FC<DonutIconProps> = ({ colour }) => (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23 41C32.9411 41 41 32.9411 41 23C41 13.0589 32.9411 5 23 5C13.0589 5 5 13.0589 5 23C5 32.9411 13.0589 41 23 41ZM23 46C35.7025 46 46 35.7025 46 23C46 10.2975 35.7025 0 23 0C10.2975 0 0 10.2975 0 23C0 35.7025 10.2975 46 23 46Z"
            fill={colour}
        />
    </svg>
);