import styled from 'styled-components';
import { colours } from '../../tokens';

export const Button = styled.button.attrs(({ type }) => ({
    type: type || 'button'
}))`
    background-color: ${colours.darkGreen100};
    border: 1px solid ${colours.darkGreen100};
    border-radius: 5px;
    color: ${colours.white};
    cursor: pointer;
    display: flex;
    padding: 0;
`;

export const SecondaryButton = styled(Button)`
    background-color: ${colours.white};
    border: 1px solid ${colours.darkGreen100};
    color: ${colours.darkGreen100};

    & svg {
        fill: red;
    }
`;

export const Image = styled.img`
    height: 32px;
    width: 32px;
`;
