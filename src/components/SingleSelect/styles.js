import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: ${({ margin }) => margin || '0 0 1rem'};
`;

export const ButtonWrapper = styled.div`
    display: flex;
`;
