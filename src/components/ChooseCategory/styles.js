import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: max-content;
`;


export const Title = styled.h3`
    font-size: 1rem;
    font-weight: normal;
    margin: 0;
    padding: 0 0 2rem;
`;

export const Grid = styled.div`
    display: grid;
    grid-gap: 24px;
    grid-template-columns: 1fr 1fr;
    width: max-content;
`;