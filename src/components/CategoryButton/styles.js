import styled from 'styled-components';
import { CATEGORY_CARD_HEIGHT, CATEGORY_CARD_WIDTH, colours } from '../../tokens';

export const Button = styled.button.attrs(() => ({
    type: 'button'
}))`
    align-items: center;
    background-color: ${({ isSelected }) => (isSelected ? colours.darkGreen100 : colours.white)};
    border: 1px solid ${colours.darkGreen60};
    border-radius: 16px;
    cursor: pointer;
    display: flex;
    height: ${({ small }) => !small && CATEGORY_CARD_HEIGHT};
    padding: ${({ small }) => small && '0 1rem'};
    justify-content: center;
    transition: all 0.3s ease 0s;
    width: ${({ small }) => !small && CATEGORY_CARD_WIDTH};

    &:hover {
        background-color: ${colours.darkGreen100};
    }
`;

export const Name = styled.p`
    color: ${({ isSelected }) => (isSelected ? colours.white : colours.darkGreen100)};
    font-size: 18px;

    /* stylelint-disable-next-line */
    ${Button}:hover & {
        color: white;
    }
`;
