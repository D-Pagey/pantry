import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: ${({ margin }) => margin};
`;

export const Label = styled.label`
    margin: 0 0 0.5rem;
`;

export const ButtonWrapper = styled.div`
    display: flex;
`;
