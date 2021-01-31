import styled from 'styled-components/macro';
import { NavLink } from 'react-router-dom';
import { colours, MOBILE_HEADER_HEIGHT, HEADER_HEIGHT, PAGE_WIDTH, mediaQuery } from '../../tokens';

export const Wrapper = styled.div`
    align-items: center;
    background-color: ${colours.white};
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.06);
    display: flex;
    height: ${MOBILE_HEADER_HEIGHT};
    justify-content: center;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 2;

    @media ${mediaQuery.tablet} {
        height: ${HEADER_HEIGHT};
    }
`;

export const InnerWrapper = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    max-width: ${PAGE_WIDTH};
    padding: 0 24px;
    width: 100%;
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

export const LogoWrapper = styled.div`
    align-items: center;
    display: flex;
`;

export const NavList = styled.ul`
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
`;

export const NavItem = styled.li`
    font-size: 1.1rem;
    margin: 0 0 0 2rem;
    position: relative;

    &:first-child {
        margin: 0;
    }
`;

export const NotificationsButton = styled.button`
    background-color: transparent;
    border: 0;
    color: ${({ hasNotifications }) => hasNotifications && '#1976D2'};
    cursor: pointer;
    display: flex;
    padding: 0;
`;

export const BellWrapper = styled.div`
    position: relative;
    right: 4rem;
`;
