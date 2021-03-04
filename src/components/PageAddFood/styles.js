import ReactDatePicker from 'react-datepicker';
import styled from 'styled-components';

export const Form = styled.form`
    padding: 1rem;
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
    margin: 1rem 0 0.5rem;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 2rem 0;

    button:first-child {
        margin: 0 1rem 0 0;
    }
`;

export const DatePicker = styled(ReactDatePicker)`
    border: 1px solid hsl(0, 0%, 80%);
    border-radius: 5px;
    padding: 0.5rem;
`;
