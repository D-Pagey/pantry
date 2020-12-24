import styled from 'styled-components';
import { colours, mediaQuery } from '../../tokens';
import { CreatableDropdown as Dropdown } from '../CreatableDropdown';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 500px;
    padding: 2rem 1rem;

    @media ${mediaQuery.tablet} {
        margin: 0;
    }
`;

export const Title = styled.h1`
    font-weight: normal;
    margin: 0 0 1.5rem;
`;

export const Span = styled.span`
    color: ${colours.darkGreen100};
`;

export const CreatableDropdown = styled(Dropdown)`
    margin: 0 0 2rem;
`;
