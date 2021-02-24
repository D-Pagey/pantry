import styled from 'styled-components';
import { colours, mediaQuery } from '../../tokens';
import { CreatableDropdown as Dropdown } from '../CreatableDropdown';
import { Button as Btn } from '../Button';

export const Wrapper = styled.div`
    border: 1px solid red;
    padding: 0.5rem;
`;

export const Title = styled.h1`
    font-weight: normal;
    margin: 0;
`;

export const Grid = styled.div`
    display: grid;
    grid-row-gap: 1rem;
    margin: 0 auto;
    max-width: 500px;
    padding: 0;

    @media ${mediaQuery.tablet} {
        grid-column-gap: 4rem;
        grid-template-columns: 1fr 1fr;
        margin: 0 auto;
        max-width: 750px;
    }
`;

export const Span = styled.span`
    color: ${colours.darkGreen100};
`;

export const CreatableDropdown = styled(Dropdown)`
    margin: 0;
    max-width: 330px;
`;

export const Button = styled(Btn)`
    @media ${mediaQuery.tablet} {
        grid-column: 2 / 3;
        grid-row: 1 / 2;
        max-width: 200px;
        justify-self: end;
    }
`;

export const Label = styled.label`
    align-self: end;
    margin: 0;

    @media ${mediaQuery.tablet} {
        grid-column: ${({ column }) => column};
        grid-row: ${({ row }) => row};
    }
`;
