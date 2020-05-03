import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { CATEGORY_CARD_WIDTH } from '../../tokens';

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
    height: 100px;
    justify-content: center;
    text-decoration: none;
    padding: 1rem;
    width: ${CATEGORY_CARD_WIDTH};
`;

export const Title = styled.h3`
    margin: 0;
    padding: 0 0 0.5rem;
`;

export const Text = styled.p`
    margin: 0;
`;
