import styled from 'styled-components';
import { colours, mediaQuery } from '../../tokens';
import { CreatableDropdown as Dropdown } from '../CreatableDropdown';
import { Button as Btn } from '../Button';

export const Grid = styled.div`
    padding: 1.5rem 1rem;

    @media ${mediaQuery.tablet} {
        display: grid;
        grid-column-gap: 3rem;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: max-content max-content;
        padding: 1.5rem 0;
    }
`;

export const DataWrapper = styled.div`
    display: flex;
    flex-direction: column;

    @media ${mediaQuery.tablet} {
        grid-column: 2;
    }
`;

export const ServingsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
    padding: 0 0 1rem;

    @media ${mediaQuery.tablet} {
        grid-row: 2 / 4;
        margin: 0;
    }
`;

export const Title = styled.h1`
    font-weight: normal;
    margin: 0 0 1.5rem;

    @media ${mediaQuery.tablet} {
        grid-column: 1 / 3;
    }
`;

export const Subtitle = styled.h2`
    font-weight: 400;
    margin: 1rem 0 1.25rem;
    text-decoration: underline;
    text-decoration-color: ${colours.darkGreen60};
`;

export const ItalicText = styled.p`
    font-style: italic;
    margin: 0 0 1rem;
`;

export const Span = styled.span`
    color: ${colours.darkGreen100};
`;

export const CreatableDropdown = styled(Dropdown)`
    margin: 0 0 1rem;
`;

export const Label = styled.label`
    display: block;
    margin: 0 0 0.5rem;
`;

export const ButtonWrapper = styled.div`
    align-items: start;
    display: flex;
    justify-content: flex-end;
    margin: 1rem 0;
`;

export const Button = styled(Btn)`
    margin: ${({ secondary }) => secondary && '0 1rem 0 0'};
`;
