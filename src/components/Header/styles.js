import styled from 'styled-components/macro';
import { NavLink } from 'react-router-dom';

export const Header = styled.header`
    display: flex;
    justify-content: space-between;
    margin: 0 0 2rem;
    padding: 2rem 0 0;
`;

export const Link = styled(NavLink)`
    color: initial;
    text-decoration: none;
`;

export const Title = styled.h4`
    font-weight: 500;
    margin: 0;
`;

export const List = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
`;

export const Item = styled.li`
    margin: 0 0 0 2rem;

    &:first-child {
        margin: 0;
    }
`;

export const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    color: grey;

    &:hover {
        color: black;
    }
`;
