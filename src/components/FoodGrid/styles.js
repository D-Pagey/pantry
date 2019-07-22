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

export const Heading = styled.h5`
    font-size: 18px;
    margin: 0 0 1rem;
`;
