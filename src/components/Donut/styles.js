import styled, { keyframes } from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    width: 60px;
`;

export const animate = (props) => keyframes`
    0% {
        stroke-dashoffset: ${props.perimeter};
    }
    100% {
        stroke-dashoffset: ${props.perimeterGap};
    }
`;

export const Circle = styled.circle`
    animation: ${animate} 1.5s;
    fill: transparent;
    stroke-dasharray: ${({ perimeter }) => perimeter};
    stroke-dashoffset: ${({ perimeterGap }) => perimeterGap};
    stroke: ${({ color }) => color};
    stroke-linecap: round;
    stroke-width: 5;
`;

export const Text = styled.text`
    dominant-baseline: middle;
    font-size: 38px;
    text-anchor: middle;
`;

export const ExpiredText = styled(Text)`
    font-size: 22px;
`;

export const Subtext = styled(Text)`
    font-size: 20px;
`;
