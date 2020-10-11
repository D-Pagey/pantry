import styled from 'styled-components';
import { colours } from '../../tokens';

export const List = styled.ul`
    align-items: center;
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
`;

export const Item = styled.li`
    border-top: 1px solid ${colours.darkGrey};
    cursor: pointer;
    padding: 1rem 0;
    text-align: center;
    text-decoration: underline;
    width: 100%;

    &:first-child {
        border-top: none;
    }

    &:hover {
        color: ${colours.blue};
    }
`;
