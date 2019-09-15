import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

export const Link = styled(RouterLink)`
    align-items: center;
    border: ${({ colour }) => `3px solid ${colour}`};
    border-radius: 6px;
    box-sizing: border-box;
    box-shadow: rgba(79, 90, 109, 0.3) 0px 0.1875rem 0.625rem 0px;
    color: initial;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    padding: 1rem;
    width: 140px;
`;

export const Title = styled.h3`
    margin: 0 0 0.5rem;
`;

export const Text = styled.p`
    margin: 0;
`;
