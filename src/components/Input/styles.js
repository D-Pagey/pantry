import styled from 'styled-components/macro';
import { colours } from '../../tokens';

export const Input = styled.input`
    border: 0;
    border-bottom: 2px solid ${colours.darkGreen100};
    border-radius: 2px;
    box-sizing: border-box;
    font-size: 1rem;
    margin: ${({ margin }) => margin};
    padding: 12px;
    width: 100%;
`;
