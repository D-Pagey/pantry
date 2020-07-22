import styled from 'styled-components';
import { colours, mediaQuery } from '../../tokens';

export const List = styled.ul`
    background-color: ${colours.darkGreen100};
    color: ${colours.white};
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    justify-content: space-between;

    @media ${mediaQuery.tablet} {
        align-items: center;
        background-color: ${colours.white};
        border: 1px solid ${colours.darkGreen100};
        border-radius: 10px;
        color: ${colours.darkGreen100};
        grid-column: 1 / 2;
        grid-row: 2;
        flex-direction: column;
        width: 175px;
    }
`;

export const Item = styled.li`
    border-bottom: ${({ isSelected }) => isSelected && `2px solid ${colours.darkGreen100}`};
    box-sizing: border-box;
    cursor: pointer;
    flex-grow: 1;
    font-weight: bold;
    padding: 1rem;
    text-align: center;

    &:hover {
        border-bottom: 2px solid ${colours.white};
    }

    @media ${mediaQuery.tablet} {
        margin: 1rem 0;
        padding: 0 0 0.25rem;
        width: max-content;

        &:hover {
            border-bottom: 2px solid ${colours.darkGreen100};
        }
    }
`;
