import styled from 'styled-components';
import { colours, mediaQuery } from '../../tokens';

export const Wrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 0 1rem 2rem;
    text-align: center;
`;

export const Title = styled.h1`
    font-size: 3rem;
    margin: 0;
    padding: 3rem 0;
    width: 230px;
`;

export const Text = styled.p`
    color: ${colours.darkGrey};
    font-size: 18px;
    margin: 0;
    padding: 0 0 3rem;
    width: 330px;

    &:first-of-type {
        padding-bottom: 2rem;
    }
`;

export const Feature = styled.div`
    display: grid;
    grid-row-gap: 2rem;
    max-width: 700px;
    padding: 3rem 0;

    @media ${mediaQuery.tablet} {
        grid-column-gap: 2rem;
        grid-row-gap: 1rem;
        grid-template-columns: 1fr max-content;
    }
`;

export const Image = styled.img`
    justify-self: center;
    max-width: 300px;
    width: 100%;

    @media ${mediaQuery.tablet} {
        grid-column: 2 / 3;
        grid-row: 1 / 3;
        justify-self: end;
    }
`;

export const SubTitle = styled.h2`
    font-size: 1.5rem;
    margin: 0;

    @media ${mediaQuery.tablet} {
        align-self: end;
    }
`;

export const Description = styled.p`
    color: ${colours.darkGrey};
    font-size: 18px;
    margin: 0;
    max-width: 500px;
`;
