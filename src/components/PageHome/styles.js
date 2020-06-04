import styled from 'styled-components';
import { colours } from '../../tokens';

export const Wrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 0 0.5rem;
    text-align: center;
`;

export const Title = styled.h1`
    font-size: 3rem;
    margin: 0;
    padding: 3rem 0;
    width: 220px;
`;

export const Text = styled.p`
    color: #7c7c7c;
    font-size: 18px;
    margin: 0;
    padding: 0 0 3rem;
    width: 330px;

    &:first-of-type {
        padding-bottom: 2rem;
    }
`;

export const FeaturesWrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
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
    max-width: 500px;
`;

// TODO: Delete this
export const GreenButton = styled.button`
    background-color: ${colours.darkGreen100};
    color: ${colours.white};
    margin: 1rem 0 0;
    padding: 1rem;
    border: 0;
    border-radius: 5px;
    cursor: pointer;
`;