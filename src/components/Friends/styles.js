import styled from 'styled-components';

import { colours } from '../../tokens';

export const List = styled.ul`
    border: 1px solid ${colours.black};
    border-radius: 5px;
    list-style: none;
    margin: 0;
    padding: 0;
`;

export const Item = styled.li`
    align-items: center;
    display: flex;
    padding: 1rem 2rem;
    border-bottom: 1px solid ${colours.black};

    &:last-child {
        border: 0;
    }
`;

export const Span = styled.span`
    flex-grow: 1;
`;

export const Image = styled.img`
    border-radius: 50%;
    width: 50px;
`;
