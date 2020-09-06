import styled from 'styled-components';

import { colours } from '../../tokens';

const DEFAULT_WIDTH = '60px';

export const Circle = styled.div`
    align-items: center;
    background-color: ${colours.orange};
    border-radius: 50%;
    display: flex;
    height: ${DEFAULT_WIDTH};
    justify-content: center;
    width: ${DEFAULT_WIDTH};
`;

export const Initials = styled.span`
    font-size: 1.2rem;
    font-weight: bold;
`;

export const Image = styled.img`
    border-radius: 50%;
    height: ${DEFAULT_WIDTH};
    width: ${DEFAULT_WIDTH};
`;