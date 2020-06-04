import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;


export const Title = styled.h3`
    margin: 0;
    padding: 0 0 1.5rem;
    font-weight: normal;
`;

export const Grid = styled.div`
    align-self: center;
    display: grid;
    grid-gap: 24px;
    grid-template-columns: 1fr 1fr;
    width: max-content;
`;