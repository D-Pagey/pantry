import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

export const Item = styled.li`
    color: ${({ colour }) => colour};
    list-style: none;
`;

export const Header = styled.th`
    cursor: pointer;
`;

export const Link = styled(RouterLink)`
    cursor: pointer;
    color: blue;
    margin: 0 0 0 1rem;
`;