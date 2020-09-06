import styled from 'styled-components';
import { ProfilePhoto as Photo } from '../ProfilePhoto';

export const List = styled.ul`
    border: 1px solid #9b9b9b;
    border-radius: 5px;
    list-style: none;
    margin: 0;
    padding: 0;
`;

export const Item = styled.li`
    align-items: center;
    display: grid;
    grid-template-columns: max-content 1fr max-content;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #9b9b9b;

    &:last-child {
        border: 0;
    }
`;

export const Name = styled.span`
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
    text-align: center;
`;

export const ProfilePhoto = styled(Photo)`
    grid-row: 1 / 3;
`;

export const HouseRole = styled.span`
    grid-column: 3 / 4;
    grid-row: 2 / 3;
    color: darkgrey;
    font-size: 14px;
`;