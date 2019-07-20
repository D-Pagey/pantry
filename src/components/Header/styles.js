import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Header = styled.header`
    padding: 2rem 2rem 0;
`;

export const Link = styled(NavLink)`
    text-decoration: none;
    color: initial;
`;

export const Title = styled.h4`
    font-weight: 500;
    margin: 0;
`;
