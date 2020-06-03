import styled from 'styled-components/macro';
import { colours } from '../../tokens';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 0 1rem;
`;

export const Input = styled.input`
    border: 0;
    border-bottom: 2px solid ${colours.darkGreen100};
    border-radius: 2px;
    padding: 12px;
`;
