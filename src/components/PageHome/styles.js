import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colours, mediaQuery } from '../../tokens';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 45rem;
    padding: 0 0 4rem;
`;

export const HeroWrapper = styled.div`
    display: grid;
    grid-row-gap: 1.5rem;
    justify-items: center;
    padding: 1.5rem 1rem 0;

    @media ${mediaQuery.tablet} {
        grid-column-gap: 2rem;
        grid-template-columns: 1fr max-content;
        grid-template-rows: 13rem max-content max-content;
        margin: 2rem 0 0;
        padding: 0;
    }
`;

export const Title = styled.h1`
    font-size: 2.75rem;
    font-weight: 500;
    margin: 0;
    text-align: center;

    @media ${mediaQuery.tablet} {
        align-self: end;
    }
`;

export const Screenshot = styled.img`
    max-width: 300px;
    width: 100%;

    @media ${mediaQuery.tablet} {
        grid-column: 2;
        grid-row: 1 / 5;
    }
`;

export const Text = styled.p`
    color: ${colours.darkGrey};
    font-size: 18px;
    margin: 0;
`;

export const FeaturesWrapper = styled.div`
    display: grid;
    grid-row-gap: 2rem;
    justify-items: center;
    padding: 1.75rem 1rem 0;

    @media ${mediaQuery.tablet} {
        justify-items: start;
        padding: 3rem 0 0;
        grid-row-gap: 2.5rem;
    }
`;

export const SubTitle = styled.h2`
    font-size: 2rem;
    font-weight: 300;
    margin: 0;
`;

export const Feature = styled.div`
    display: grid;
    grid-row-gap: 1.5rem;

    @media ${mediaQuery.tablet} {
        grid-column-gap: 2rem;
        grid-row-gap: 1rem;
        grid-template-columns: 1fr 1fr;
    }
`;

export const Image = styled.img`
    justify-self: center;
    max-width: 300px;
    width: 100%;

    @media ${mediaQuery.tablet} {
        grid-column: ${({ positionImageRight }) => (positionImageRight ? '2' : '1')};
        grid-row: 1 / 3;
    }
`;

export const FeatureTitle = styled.h3`
    font-size: 1.25rem;
    font-weight: 400;
    margin: 0;

    @media ${mediaQuery.largeMobile} {
        font-size: 1.5rem;
    }

    @media ${mediaQuery.tablet} {
        align-self: end;
    }
`;

export const Description = styled.p`
    color: ${colours.darkGrey};
    font-size: 18px;
    margin: 0;
`;

export const PositionedLink = styled(Link)`
    align-self: center;
    margin: 2rem 0 0;
`;
