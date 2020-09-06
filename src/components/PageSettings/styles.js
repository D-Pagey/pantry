import styled from 'styled-components';
import { Input as RawInput } from '../Input';
import { Button as RawButton } from '../Button';

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: max-content 1fr;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    padding: 1.5rem;
    max-width: 400px;
    margin: 0 auto;
`;

export const Name = styled.h3`
    align-self: center;
    font-size: 1.25rem;
    margin: 0;
    text-align: center;
`;

export const Heading = styled.h4`
    font-size: 1.25rem;
    grid-column: 1 / 3;
    margin: 0;
`;

export const Text = styled.p`
    grid-column: 1 / 3;
    margin: 0;
`;

export const HouseholdWrapper = styled.div`
    grid-column: 1 / 3;
`;

export const Input = styled(RawInput)`
    grid-column: 1 / 3;
`;

export const InviteButton = styled(RawButton)`
    grid-column: 2 / 3;
`;

export const SignOutButton = styled(RawButton)`
    grid-column: 1 / 3;
    justify-self: center;
    margin: 2rem 0 0;
`;
