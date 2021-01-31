import styled from 'styled-components';
import { colours } from '../../tokens';

export const Wrapper = styled.div`
    display: inline-flex;
`;

export const Span = styled.span`
    background-color: ${colours.darkGreen100};
    color: ${colours.white};
    padding: 0.5rem;
    border-radius: 10px 0 0 10px;
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
