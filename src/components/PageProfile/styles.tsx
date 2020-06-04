import styled from 'styled-components';

type ColourSquareProps = {
    readonly colour?: string;
};

export const ColourSquare = styled.div<ColourSquareProps>`
    background-color: ${({ colour }) => colour};
    height: 20px;
    width: 20px;
`;
