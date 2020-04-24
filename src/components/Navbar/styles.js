import styled from 'styled-components/macro';
import { NavLink } from 'react-router-dom';

export const Wrapper = styled.div`
    align-items: center;
    display: flex;
    padding: 33px 24px 0;
`;

export const Link = styled(NavLink)`
    color: initial;
    text-decoration: none;
`;

export const Title = styled.h4`
    font-size: 25px;
    font-weight: 500;
    margin: 0;
    padding: 0 0 0 14px;
`;

export const Image = styled.img`
    position: relative;
    top: 2px;
    width: 32px;
`;