import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
    margin: 0 0 0.5rem;
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, max-content);
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    margin: 0 0 1rem;
`;

export const DateSpan = styled.span`
    color: blue;
    grid-row: 2;
`;

export const UpButton = styled.button.attrs({
    type: 'button'
})`
    grid-row: 1;
`;
