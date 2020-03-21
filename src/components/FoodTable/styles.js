import styled from 'styled-components';

export const Item = styled.li`
    color: ${({ colour }) => colour};
    list-style: none;
`;

export const Header = styled.th`
    cursor: pointer;
`;
