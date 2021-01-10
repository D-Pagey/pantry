import styled from 'styled-components';
import { colours, mediaQuery } from '../../tokens';
import { Button } from '../Button';

export const Wrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 900px;
    padding: 1rem;
    position: relative;
    top: -54px;

    @media ${mediaQuery.largeMobile} {
        top: -30px;
    }

    @media ${mediaQuery.tablet} {
        flex-direction: row;
        padding: 0;
        position: initial;
    }
`;

export const LoginWrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 2rem 1rem 1rem;
    width: 100%;
`;

export const GoogleButton = styled(Button)`
    background-color: ${colours.blue};
    max-width: 300px;
    width: 80%;
`;

export const Text = styled.p`
    text-align: center;
`;

export const EmailWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;
    max-width: 320px;
    width: 100%;
`;

export const Image = styled.img`
    margin: 0;
    max-width: 400px;
    opacity: 60%;
    width: 95%;

    @media ${mediaQuery.laptop} {
        max-width: 500px;
    }
`;

export const SendButton = styled(Button)`
    align-self: flex-end;
    margin: 1rem 0 0;
    max-width: fit-content;
`;

export const Title = styled.h2`
    font-weight: 400;
`;
