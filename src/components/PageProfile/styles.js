import styled from 'styled-components';

export const ColourSquare = styled.div`
    background-color: ${({ colour }) => colour};
    height: 20px;
    width: 20px;
`;
