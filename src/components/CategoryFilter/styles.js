import styled from 'styled-components';
import { colours } from '../../tokens';

export const Wrapper = styled.div`
    background-color: ${colours.darkGreen100};
`;

export const List = styled.ul`
    color: ${colours.white};
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    justify-content: space-between;
`;

export const Item = styled.li`
    border-bottom: ${({ isSelected }) => isSelected && `2px solid ${colours.white}`};
    cursor: pointer;
    flex-grow: 1;
    font-weight: bold;
    padding: 1rem;
    text-align: center;

    &:hover {
        border-bottom: 2px solid ${colours.white};
    }
`;