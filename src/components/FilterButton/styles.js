import styled from 'styled-components';
import { colours } from '../../tokens';

export const Wrapper = styled.div`
    display: inline-flex;
    margin: 0 0.5rem 0 0;
`;

export const Span = styled.span`
    background-color: ${({ clickable }) => (clickable ? colours.darkGreen100 : colours.blue)};
    color: ${colours.white};
    padding: 0.5rem;
    border-radius: ${({ clickable }) => (clickable ? '10px 0 0 10px' : '10px')};
`;

export const Button = styled.button.attrs(() => ({
    type: 'button'
}))`
    border: none;
    background: ${colours.red};
    border-radius: 0 10px 10px 0;
    cursor: pointer;
    color: ${colours.white};
    padding: 0 0.4rem 0 0.3rem;
`;
