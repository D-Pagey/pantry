import styled from 'styled-components';
import { colours } from '../../tokens';

export const Wrapper = styled.div`
    align-items: center;
    display: flex;
`;

export const List = styled.ul`
    display: inline-flex;
    list-style: none;
    margin: 0 1rem;
    padding: 0;
`;

export const Button = styled.button.attrs(() => ({
    type: 'button'
}))`
    border-radius: 50%;
    border: none;
    background: none;
    cursor: pointer;
    display: flex;
    margin: 0 0 0 1rem;
    padding: 0;
    justify-content: center;
    align-items: center;

    &:first-child {
        margin: 0;
    }
`;

export const Image = styled.img`
    border-radius: 50%;
    border: ${({ isSelected }) => `2px solid ${isSelected ? colours.darkGreen100 : colours.white}`};
    height: 50px;
    width: 50px;
`;

export const ClearButton = styled.button.attrs(() => ({
    type: 'button'
}))`
    background: none;
    border: none;
    color: ${({ disabled }) => (disabled ? colours.darkGrey : colours.blue)};
    cursor: pointer;
    text-decoration: underline;
`;
