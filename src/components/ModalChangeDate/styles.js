import styled from 'styled-components';
import { Button as Btn } from '../Button';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Title = styled.h2`
    font-weight: normal;
    text-align: center;
    margin: 0 0 1.5rem;
`;

export const Button = styled(Btn)`
    margin: 1.5rem 0 0;
    align-self: flex-end;
`;
