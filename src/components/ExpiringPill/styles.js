import styled from 'styled-components';

import { colours, mediaQuery } from '../../tokens';

export const Wrapper = styled.div`
    background-color: ${({ isEnabled }) => isEnabled && colours.darkGreen10};
    border: 2px solid ${colours.darkGreen40};
    border-radius: 16px;
    cursor: pointer;
    justify-self: end;
    margin: ${({ margin }) => margin};
    padding: 0.5rem 1rem;
    width: max-content;

    @media ${mediaQuery.tablet} {
        grid-column: 2 / 3;
        justify-self: end;
        margin: 1rem 0;
    }
`;

export const Text = styled.span`
    color: ${colours.darkGreen100};
`;
