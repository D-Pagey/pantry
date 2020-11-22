import styled from 'styled-components';
import { colours } from '../../tokens';
import { Button } from '../Button';

export const Wrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 1rem;
`;

export const Title = styled.h1`
    font-weight: normal;
    margin: 1rem 0;
`;

export const GoogleButton = styled(Button)`
    background-color: ${colours.blue};
`;

export const EmailWrapper = styled.div`
    display: flex;
    margin: 0;
    width: 330px;
`;

export const Image = styled.img`
    margin: 2rem 0 0;
    width: 400px;
`;
