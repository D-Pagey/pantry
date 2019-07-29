import styled from 'styled-components/macro';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
    margin: 0 0 0.5rem;
`;

export const Input = styled.input`
    border: 1px solid grey;
    border-radius: 2px;
    padding: 5px;
`;

export const Error = styled.p`
    color: red;
    font-size: 14px;
    margin: 0.5rem 0 0;
`;