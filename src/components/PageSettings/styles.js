import styled from 'styled-components';
import { Input as RawInput } from '../Input';
import { Button as RawButton } from '../Button';
import { ProfilePhoto } from '../ProfilePhoto';
import { mediaQuery } from '../../tokens';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin: 0 auto;
    max-width: 750px;

    @media ${mediaQuery.tablet} {
        padding: 0;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 3rem;
    }
`;

export const Subtitle = styled.h2`
    font-weight: normal;

    @media ${mediaQuery.tablet} {
        margin: 0 0 1rem;
    }
`;

export const PersonalSubtitle = styled(Subtitle)`
    grid-column: 1;
    margin: 0;

    @media ${mediaQuery.tablet} {
        grid-column: 1 / 3;
    }
`;

export const PersonalWrapper = styled.div`
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 1fr max-content;
    margin: 1rem 0 0;

    @media ${mediaQuery.tablet} {
        margin: 0;
        grid-template-columns: 1fr max-content;
        grid-template-rows: max-content max-content max-content;
    }
`;

export const Name = styled.p`
    align-self: center;
    margin: 0;

    @media ${mediaQuery.tablet} {
        grid-column: 1;
        grid-row: 2 / 3;
    }
`;

export const Email = styled.p`
    grid-column: 1 / 3;
    margin: 0;
`;

export const Bold = styled.span`
    font-weight: bold;
    margin: 0 0.5rem 0 0;
`;

export const Photo = styled(ProfilePhoto)`
    align-self: center;
    grid-column: 2;
    grid-row: 1 / 3;

    @media ${mediaQuery.tablet} {
        grid-row: 2 / 3;
        grid-column: 2;
    }
`;

export const HouseholdWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem 0 0;

    @media ${mediaQuery.tablet} {
        margin: 0;
        grid-column: 1;
        grid-row: 1/ 3;
    }
`;

export const Text = styled.p`
    margin: 2rem 0 1rem;
`;

export const Input = styled(RawInput)`
    margin: 0 0 1rem;
`;

export const InviteButton = styled(RawButton)`
    align-self: flex-end;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 2.5rem 0 0 0;

    @media ${mediaQuery.tablet} {
        margin: 0;
        align-items: start;
    }
`;

export const SignOutButton = styled(RawButton)`
    margin: 0 0 0 1rem;
`;
