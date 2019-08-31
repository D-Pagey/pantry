import styled from 'styled-components/macro';
import { NavLink } from 'react-router-dom';

export const List = styled.ul`
    background-color: grey;
    bottom: 0;
    display: flex;
    justify-content: space-evenly;
    list-style: none;
    padding: 0;
    left: 0;
    margin: 0;
    max-width: 425px;
    position: fixed;
    right: 0;
`;

export const Item = styled.li`
    width: 50%;
`;

export const StyledNavLink = styled(NavLink)`
    color: black;
    display: inline-block;
    padding: 1rem 0;
    text-align: center;
    text-decoration: none;
    width: 100%;

    &.active {
        background-color: white;
    }
`;
