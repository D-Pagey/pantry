import styled from 'styled-components';
import { colours } from '../../tokens';

export const List = styled.ul`
    background-color: ${colours.darkGreen100};
    color: ${colours.white};
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    justify-content: space-between;
`;

export const Item = styled.li`
    border-bottom: ${({ isSelected }) => isSelected && `2px solid ${colours.darkGreen100}`};
    box-sizing: border-box;
    cursor: pointer;
    flex-grow: 1;
    font-weight: bold;
    padding: 1rem 0;
    text-align: center;

    &:hover {
        border-bottom: 2px solid ${colours.white};
    }
`;
