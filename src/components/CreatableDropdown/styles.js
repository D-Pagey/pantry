import styled from 'styled-components';
import { colours } from '../../tokens';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ErrorText = styled.span`
    color: ${colours.red};
    font-size: 14px;
    margin: 0.5rem 0 0;
`;
