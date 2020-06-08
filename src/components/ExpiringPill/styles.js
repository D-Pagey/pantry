import styled from 'styled-components';
import { colours } from '../../tokens';

export const Wrapper = styled.div`
    align-self: flex-end;
    background-color: ${({ isEnabled }) => isEnabled && colours.darkGreen10};
    border: 2px solid ${colours.darkGreen40};
    border-radius: 16px;
    cursor: pointer;
    margin: ${({ margin }) => margin};
    padding: 0.5rem 1rem;
    width: max-content;
`;

export const Text = styled.span`
    color: ${colours.darkGreen100};
`;