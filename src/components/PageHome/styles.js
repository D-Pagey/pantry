import styled from 'styled-components';

export const Wrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 0 0.5rem;
`;

export const Title = styled.h1`
    font-size: 3rem;
    margin: 3rem 0;
    text-align: center;
    width: 220px;
`;

export const Text = styled.p`
    color: #7C7C7C;
    font-size: 18px;
    margin: 0 0 3rem;
    text-align: center;
    width: 330px;

    &:first-of-type {
        margin-bottom: 2rem;
    }
`;
