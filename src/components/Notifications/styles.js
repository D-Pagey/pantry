import styled from 'styled-components';

import { mediaQuery, colours } from '../../tokens';

export const Wrapper = styled.div`
    margin: 1rem 0;
`;

export const Title = styled.h2`
    margin: 0;
    padding: 0 0 1rem;
`;

export const List = styled.ul`
    border: 1px solid black;
    border-radius: 5px;
    list-style: none;
    margin: 0;
    padding: 1rem;
`;

export const Item = styled.li`
    border-bottom: 1px solid ${colours.orange};
    display: grid;
    grid-row-gap: 1rem;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: max-content 1fr;
    padding: 0 0 1rem;

    @media ${mediaQuery.tablet} {
        grid-template-columns: 1fr 125px 125px;
        grid-template-rows: 1fr;
    }
`;

export const Text = styled.span`
    grid-column: 1 / 3;
    justify-self: center;
    align-self: center;

    @media ${mediaQuery.tablet} {
     grid-column: 1 / 2;
     justify-self: left;
     padding: 0 0 0 1rem;
    }
`;
