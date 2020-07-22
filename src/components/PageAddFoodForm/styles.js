import styled from 'styled-components';
import { Form as FormikForm } from 'formik';

export const Wrapper = styled.div`
    box-sizing: border-box;
    height: 100%;
    padding: 2rem 0 0 0;
`;

export const StepWrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 auto;
    min-height: 500px;
    width: 325px;
`;

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const Label = styled.label`
    font-size: 1rem;
    padding: 0 0 1rem;
    width: 100%;
`;

export const Form = styled(FormikForm)`
    height: 100%;
`;

export const ButtonWrapper = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    margin: 3rem 0 0;
    padding: 0 2rem;
    width: 100%;
`;
