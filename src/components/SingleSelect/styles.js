import styled from 'styled-components';
import { colours } from '../../tokens';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: ${({ margin }) => margin || '0 0 1rem'};
`;

export const ButtonWrapper = styled.div`
    display: grid;
    grid-column-gap: 1rem;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`;

export const Button = styled.button.attrs(() => ({
    type: 'button'
}))`
    background-color: ${({ selected }) => (selected ? colours.darkGreen100 : colours.white)};
    border: 1px solid ${colours.darkGreen60};
    border-radius: 5px;
    color: ${({ selected }) => (selected ? colours.white : colours.darkGreen100)};
    cursor: pointer;
    padding: 1rem;

    &:hover {
        background-color: ${colours.darkGreen100};
        color: white;
    }
`;
