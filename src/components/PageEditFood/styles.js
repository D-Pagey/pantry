import styled from 'styled-components';
import { colours } from '../../tokens';
import { CreatableDropdown as Dropdown } from '../CreatableDropdown';
import { Button as Btn } from '../Button';

export const Wrapper = styled.div`
    padding: 1.5rem 1rem;
`;

export const Title = styled.h1`
    font-weight: normal;
    margin: 0 0 1.5rem;
`;

export const Subtitle = styled.h2`
    font-weight: 400;
    margin: 1rem 0 1.25rem;
    text-decoration: underline;
    text-decoration-color: ${colours.darkGreen60};
`;

export const ItalicText = styled.p`
    font-style: italic;
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
    display: flex;
    justify-content: flex-end;
    margin: 2rem 0 1rem;
`;

export const Button = styled(Btn)`
    margin: ${({ secondary }) => secondary && '0 1rem 0 0'};
`;
