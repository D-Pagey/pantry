import styled from 'styled-components';

export const Wrapper = styled.div`
    padding: 1rem;
`;

export const Title = styled.h2`
    margin: 0;
    padding: 0 0 1rem;
`;

export const List = styled.ul`
    border: 1px solid black;
    border-radius: 5px;
    list-style: none;
    margin: 0;
    padding: 1rem;
`;

export const Item = styled.li`
    align-items: center;
    border-bottom: 1px solid grey;
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;

    &:first-child {
        padding-top: 0;
    }
`;
