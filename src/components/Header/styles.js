import styled from 'styled-components/macro';
import { NavLink } from 'react-router-dom';
import { colours, HEADER_HEIGHT } from '../../tokens';

export const Wrapper = styled.div`
    align-items: center;
    background-color: ${colours.white};
    box-shadow: 0 4px 8px 0 rgba(0,0,0,.06);
    display: flex;
    height: ${HEADER_HEIGHT};
    padding: 0 24px;
    left: 0; 
    position: fixed;
    right: 0;
    top: 0;
    z-index: 2;
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

export const Logo = styled.img`
    position: relative;
    top: 2px;
    width: 32px;
`;

export const Arrow = styled.img`
    cursor: pointer;
    height: 16px;
    width: 16px;
`;