import styled from 'styled-components';
import { colours, zIndex } from '../../tokens';

export const Wrapper = styled.div`
    align-items: center;
    background-color: ${colours.white};
    border-top: 1px solid ${colours.silver};
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    left: 0;
    padding: 1rem;
    position: fixed;
    right: 0;
    z-index: ${zIndex.default};
`;

export const FilterButton = styled.button.attrs(() => ({
    type: 'button'
}))`
    border: none;
    cursor: pointer;
    display: flex;
    padding: 0;
    margin: 0 1rem 0 0;
    width: 50px;
`;

export const FilterImage = styled.img`
    width: 100%;
`;
