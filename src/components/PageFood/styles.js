import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { mediaQuery } from '../../tokens';
import { Button as Btn } from '../Button';

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;

    @media ${mediaQuery.tablet} {
        grid-column-gap: 4rem;
        padding: 1rem;
        grid-template-columns: max-content max-content;
        margin: 0 auto;
        width: max-content;
    }
`;

export const RouterLink = styled(Link)`
    color: inherit;
    text-decoration: none;
`;

export const FoodCardWrapper = styled.div`
    @media ${mediaQuery.tablet} {
        grid-column: 2 / 3;
    }
`;

export const Button = styled(Btn)`
    @media ${mediaQuery.tablet} {
        grid-column: 2 / 3;
        grid-row: 3 / 4;
        justify-self: end;
    }
`;
