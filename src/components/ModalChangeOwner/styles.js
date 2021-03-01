import styled from 'styled-components';
import { colours } from '../../tokens';
import { Button as Btn } from '../Button';
import { ProfilePhoto } from '../ProfilePhoto';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Title = styled.h2`
    font-weight: normal;
    text-align: center;
    margin: 0 0 1.5rem;
`;

export const Text = styled.p`
    font-size: 1.25rem;
    margin: 0;
    text-align: center;
`;

export const Subtitle = styled.h3`
    font-style: italic;
    font-weight: normal;
    margin: 2rem 0 1rem;
    text-align: center;
`;

export const TenantsWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

export const TenantPhoto = styled(ProfilePhoto)`
    cursor: pointer;
    margin: 0 1rem 0 0;
`;

export const Button = styled(Btn)`
    align-self: flex-end;
    margin: 1.5rem 0 0;
`;

export const Green = styled.span`
    color: ${colours.darkGreen100};
`;

export const BoldGreen = styled(Green)`
    font-weight: 500;
`;

export const Date = styled.span`
    color: ${({ color }) => color};
`;
