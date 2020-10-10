import styled from 'styled-components';
import { colours } from '../../tokens';
import { ProfilePhoto as Photo } from '../ProfilePhoto';

export const List = styled.ul`
    border: 1px solid #9b9b9b;
    border-radius: 5px;
    list-style: none;
    margin: 0;
    max-width: 400px;
    padding: 0;
`;

export const Item = styled.li`
    align-items: center;
    border-bottom: 1px solid #9b9b9b;
    display: grid;
    grid-column-gap: 1rem;
    grid-template-columns: max-content 0.8fr 0.2fr max-content;
    padding: 1rem;

    &:last-child {
        border: 0;
    }
`;

export const ProfilePhoto = styled(Photo)`
    grid-row: 1 / 3;
`;

export const Name = styled.span`
    color: ${({ isPending }) => isPending && colours.blue};
    font-style: ${({ isPending }) => isPending && 'italic'};
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    text-align: center;
`;

export const Email = styled.span`
    color: darkgrey;
    font-size: 14px;
    font-style: italic;
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    text-align: center;
`;

export const Span = styled.span`
    font-size: 22px;
    grid-row: 1 / 3;
    text-align: center;
`;

export const MenuButton = styled.button.attrs({
    type: 'button'
})`
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    grid-row: 1 / 3;
    justify-content: center;
    padding: 0.5rem;
`;
