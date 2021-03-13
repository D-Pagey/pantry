import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';

export const Item = styled.span`
    color: white;
    text-decoration: none;
    padding: 0 0 1rem;
`;

export const NavLink = styled(Link)`
    color: white;
    text-decoration: none;
    padding: 0 0 1rem;

    &:hover {
        color: orange;
    }
`;

export const Button = styled.button.attrs({
    type: 'button'
})`
    background-color: rgb(55, 58, 71);
    border: none;
    color: white;
    display: inline-flex;
    padding: 0;
    text-decoration: none;

    &:hover {
        color: orange;
    }
`;

export const MenuStyles = {
    /* Position and sizing of burger button */
    bmBurgerButton: {
        position: 'fixed',
        width: '36px',
        height: '30px',
        right: '28px',
        top: '25px'
    },

    /* Color/shape of burger icon bars */
    bmBurgerBars: {
        background: '#373a47'
    },

    /* Color/shape of burger icon bars on hover */
    bmBurgerBarsHover: {
        background: '#a90000'
    },

    /* Position and sizing of clickable cross button */
    bmCrossButton: {
        height: '24px',
        width: '24px'
    },

    /* Color/shape of close button cross */
    bmCross: {
        background: '#bdc3c7'
    },

    /*
        Sidebar wrapper styles
        Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
    */
    bmMenuWrap: {
        position: 'fixed',
        height: '100%'
    },

    /* General sidebar styles */
    bmMenu: {
        background: '#373a47',
        padding: '2.5em 1.5em 0',
        fontSize: '1.15em'
    },

    /* Morph shape necessary with bubble or elastic */
    bmMorphShape: {
        fill: '#373a47'
    },

    /* Wrapper for item list */
    bmItemList: {
        color: '#b8b7ad',
        padding: '0.8em',
        display: 'flex',
        flexDirection: 'column'
    },

    /* Individual item */
    bmItem: {},

    /* Styling of overlay */
    bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)'
    }
};
