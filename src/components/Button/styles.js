import styled from 'styled-components';
import { colours } from '../../tokens';

export const Button = styled.button.attrs(({ type }) => ({
    type: type || 'button'
}))`
    background-color: ${colours.darkGreen100};
    border: 0;
    border-radius: 5px;
    color: ${colours.white};
    cursor: pointer;
    padding: 1rem;
    margin: ${({ margin }) => margin};
    min-width: 68px;
    width: ${({ size }) => size === 'sm' && 'max-content'};
`;

export const SecondaryButton = styled(Button)`
    background-color: ${colours.white};
    border: 1px solid ${colours.darkGreen100};
    color: ${colours.darkGreen100};
    margin: ${({ margin }) => margin};
`;

export const DisabledButton = styled(Button)`
    background-color: ${colours.grey};
    color: ${colours.white};
    cursor: not-allowed;
    margin: ${({ margin }) => margin};
`;

export const DestructiveButton = styled(Button)`
    background-color: #EB5757;
`;
