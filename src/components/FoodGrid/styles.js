import styled from 'styled-components/macro';

export const Wrapper = styled.div``;

export const List = styled.ul`
    display: grid;
    grid-column-gap: 1rem;
    grid-template-columns: repeat(4, 1fr);
    list-style: none;
    margin: 0;
    padding: 0;
`;

export const Heading = styled.h2`
    font-size: 18px;
    margin: 0 0 1rem;
`;

export const Category = styled.h3`
    font-size: 16px;
    margin: 0 0 1rem;
    grid-column: 1 / 5;
`;

export const Title = styled.h1``;

export const Item = styled.li`
    color: ${({ colour }) => colour};
`;
