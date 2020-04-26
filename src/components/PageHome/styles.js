import styled from 'styled-components';

export const Wrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 0 0.5rem;
    text-align: center;
`;

export const Title = styled.h1`
    font-size: 3rem;
    margin: 3rem 0;
    width: 220px;
`;

export const Text = styled.p`
    color: #7c7c7c;
    font-size: 18px;
    margin: 0 0 3rem;
    width: 330px;

    &:first-of-type {
        margin-bottom: 2rem;
    }
`;

export const FeaturesWrapper = styled.div`
    padding: 2rem 0 0 0;
`;

export const SubTitle = styled.h2`
    font-size: 1.5rem;
    margin: 0;
    padding: 4rem 0 1.5rem;
`;

export const Description = styled.p`
    color: #7c7c7c;
    font-size: 18px;
    margin: 0;
`;