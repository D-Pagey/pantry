import styled from 'styled-components';
import { colours } from '../../tokens';

export const Wrapper = styled.div`
    padding: 1rem 0 0 0;
`;

export const Step2Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Button = styled.button.attrs(() => ({
    type: 'button'
}))`
    background-color: ${colours.darkGreen100};
    border: 0;
    border-radius: 5px;
    color: ${colours.white};
    cursor: pointer;
    padding: 1rem;
    min-width: 68px;
`;

export const SubmitButton = styled(Button).attrs(() => ({
    type: 'submit'
}))``;
