import styled from 'styled-components';

export const Wrapper = styled.ul`
    display: grid;
    grid-column-gap: 1rem;
    grid-template-columns: repeat(4, max-content);
    list-style: none;
    margin: 0;
    padding: 0;
    width: max-content;
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
