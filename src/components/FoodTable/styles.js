import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

export const Wrapper = styled.div`
    overflow: scroll;
    padding: 1rem 0;
`;

export const Table = styled.table`
    border: 1px solid #bdbdbd;
    border-collapse: collapse;
`;

export const TableHead = styled.thead`
    border-bottom: 1px solid grey;
`;

export const Item = styled.li`
    color: ${({ colour }) => colour};
    list-style: none;
`;

export const Header = styled.th`
    cursor: pointer;
    padding: 1rem;
`;

export const Link = styled(RouterLink)`
    cursor: pointer;
    color: blue;
    padding: 0 0 0 1rem;
`;

export const TableData = styled.td`
    padding: 1rem;
    background-color: #d7faff;
`;

export const TableRow = styled.tr`
    & > td {
        background-color: ${({ isOdd }) => isOdd && 'white'};
    }
`;
