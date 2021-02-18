import styled from 'styled-components';
import { Button as Btn } from '../Button';

export const Form = styled.form`
    padding: 1rem 0.5rem;
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
    margin: 1rem 0 0.5rem;
`;

export const Button = styled(Btn)`
    align-self: flex-end;
    margin: 2rem 0 0;
`;
