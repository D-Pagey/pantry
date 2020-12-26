import styled from 'styled-components';
import { colours, mediaQuery } from '../../tokens';
import { CreatableDropdown as Dropdown } from '../CreatableDropdown';
import { Button as Btn } from '../Button';
import { ChooseCategory as Choose } from '../ChooseCategory';

export const Title = styled.h1`
    font-weight: normal;
    margin: 2rem 1rem 1rem;
`;

export const Wrapper = styled.div`
    display: grid;
    grid-row-gap: 1rem;
    margin: 0 auto;
    max-width: 500px;
    padding: 1rem;

    @media ${mediaQuery.tablet} {
        grid-template-columns: 1fr 1fr;
        margin: 0;
        max-width: none;
    }
`;

export const Span = styled.span`
    color: ${colours.darkGreen100};
`;

export const CreatableDropdown = styled(Dropdown)`
    margin: 0;
`;

export const Button = styled(Btn)`
    @media ${mediaQuery.tablet} {
        grid-column: 2 / 3;
        grid-row: 1 / 2;
        max-width: 200px;
        justify-self: end;
    }
`;

export const ChooseCategory = styled(Choose)`
    @media ${mediaQuery.tablet} {
        grid-column: 1 / 2;
        border: 1px solid red;
    }
`;

export const Subtitle = styled.h3`
    margin: 0;
`;
