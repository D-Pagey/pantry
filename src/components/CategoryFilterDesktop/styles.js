import styled from 'styled-components';
import { colours } from '../../tokens';

export const List = styled.ul`
    display: flex;
    list-style: none;
    font-size: 26px;
    margin: 0;
    padding: 0;
`;

export const Item = styled.li`
    border-bottom: 2px solid;
    border-color: ${({ isSelected }) => isSelected && colours.darkGreen100};
    color: ${({ isSelected }) => isSelected && colours.darkGreen100};
    cursor: pointer;
    padding: 0 1rem 1rem;

    &:hover {
        color: ${colours.darkGreen100};
        border-bottom: 2px solid ${colours.darkGreen100};
    }
`;
