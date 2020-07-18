import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
    display: flex;
    padding: 0 1rem 10rem;
    flex-direction: column;
`;

export const RouterLink = styled(Link)`
    color: inherit;
    text-decoration: none;
`;