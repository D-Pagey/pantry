import styled from 'styled-components';
import { Input as RawInput } from '../Input';
import { Button as RawButton } from '../Button';
import { ProfilePhoto } from '../ProfilePhoto';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
`;

export const PersonalWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr max-content;
    grid-gap: 1rem;
`;

export const Photo = styled(ProfilePhoto)`
    align-self: center;
    grid-column: 2;
    grid-row: 1;
`;

export const Name = styled.p`
    margin: 0;
    align-self: center;
`;

export const Email = styled.p`
    margin: 0;
    grid-column: 1 / 3;
`;

export const Bold = styled.span`
    font-weight: bold;
    margin: 0 0.5rem 0 0;
`;

export const Heading = styled.h4`
    font-size: 1.25rem;
    grid-column: 1 / 3;
    margin: 0;
`;

export const Text = styled.p`
    margin: 2rem 0 1rem;
`;

export const HouseholdWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem 0 0;
`;

export const Input = styled(RawInput)`
    margin: 0 0 1rem;
`;

export const InviteButton = styled(RawButton)`
    align-self: flex-end;
`;

export const Subtitle = styled.h2`
    font-weight: normal;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 2.5rem 0 0 0;
`;

export const SignOutButton = styled(RawButton)`
    margin: 0 0 0 1rem;
`;
