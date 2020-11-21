import React, { FC } from 'react';
import { colours } from '../../tokens';

type CloseIconProps = {
    disabled?: boolean;
};

export const CloseIcon: FC<CloseIconProps> = ({ disabled }) => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M30 12.0143L27.9857 10L20 17.9857L12.0143 10L10 12.0143L17.9857 20L10 27.9857L12.0143 30L20 22.0143L27.9857 30L30 27.9857L22.0143 20L30 12.0143Z"
            fill={disabled ? colours.white : colours.darkGreen100}
        />
    </svg>
);
