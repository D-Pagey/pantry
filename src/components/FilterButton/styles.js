import styled from 'styled-components';
import { colours, mediaQuery } from '../../tokens';

export const Wrapper = styled.div`
    display: inline-flex;
    margin: 0.5rem 0.5rem 0 0;

    @media ${mediaQuery.tablet} {
        margin: 0 0.5rem 0 0;
    }
`;

export const Span = styled.span`
    background-color: ${({ clickable }) => (clickable ? colours.darkGreen100 : colours.blue)};
    border-radius: ${({ clickable }) => (clickable ? '10px 0 0 10px' : '10px')};
    color: ${colours.white};
    padding: 0.5rem;
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
