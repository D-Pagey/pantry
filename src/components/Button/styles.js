import styled from 'styled-components';
import { colours } from '../../tokens';

export const Button = styled.button.attrs(({ type }) => ({
    type: type || 'button'
}))`
    background-color: ${({ disabled }) => (disabled ? colours.grey : colours.darkGreen100)};
    border: 0;
    border-radius: 5px;
    color: ${colours.white};
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    padding: 1rem;
    min-width: 68px;
`;
