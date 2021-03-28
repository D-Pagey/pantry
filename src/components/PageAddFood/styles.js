import ReactDatePicker from 'react-datepicker';
import styled from 'styled-components';
import { colours, mediaQuery } from '../../tokens';
import { CreatableDropdown } from '../CreatableDropdown';

export const Form = styled.form`
    display: flex;
    padding: 1rem;
    flex-direction: column;

    @media ${mediaQuery.tablet} {
        display: grid;
        grid-column-gap: 2rem;
        grid-row-gap: 1.5rem;
        grid-template-columns: 1fr 1fr;
        max-width: 750px;
        margin: 0 auto;
        padding: 0;
    }
`;

export const Subtitle = styled.h2`
    font-weight: 400;
    margin: 1rem 0 0;
    text-decoration: underline;
    text-decoration-color: ${colours.darkGreen60};

    @media ${mediaQuery.tablet} {
        margin: 0;
    }
`;

export const Label = styled.label`
    margin: 1rem 0 0;

    &:first-child {
        margin: 0;
    }

    @media ${mediaQuery.tablet} {
        grid-column: ${({ column }) => column};
        grid-row: ${({ row }) => row};
        margin: 0;
    }
`;

export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 1.5rem 0;

    @media ${mediaQuery.tablet} {
        grid-column: 2;
    }

    button:first-child {
        margin: 0 1rem 0 0;
    }
`;

export const DatePickerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem 0 0;

    @media ${mediaQuery.tablet} {
        margin: 0;
        grid-column: 1;
        grid-row: 4;
    }
`;

export const DatePicker = styled(ReactDatePicker)`
    border: 1px solid hsl(0, 0%, 80%);
    border-radius: 5px;
    margin: 0.5rem 0 0;
    padding: 0.5rem;
`;

export const Dropdown = styled(CreatableDropdown)`
    margin: 0.5rem 0 0;
`;
