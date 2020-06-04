import React from 'react';
import styled from 'styled-components';
import { CATEGORY_CARD_HEIGHT, CATEGORY_CARD_WIDTH, colours } from '../../tokens';

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
    readonly isSelected?: boolean;
}

export const Button = styled.button.attrs(() => ({
    type: 'button'
}))<ButtonProps>`
    align-items: center;
    background-color: ${({ isSelected }) => (isSelected ? colours.darkGreen100 : colours.white)};
    border: 1px solid ${colours.darkGreen60};
    border-radius: 16px;
    cursor: pointer;
    display: flex;
    height: ${CATEGORY_CARD_HEIGHT};
    justify-content: center;
    transition: all 0.3s ease 0s;
    width: ${CATEGORY_CARD_WIDTH};

    &:hover {
        background-color: ${colours.darkGreen100};
    }
`;

type NameProps = {
    readonly isSelected?: boolean;
};

export const Name = styled.p<NameProps>`
    color: ${({ isSelected }) => (isSelected ? colours.white : colours.darkGreen100)};
    font-size: 18px;

    /* stylelint-disable-next-line */
    ${Button}:hover & {
        color: white;
    }
`;
