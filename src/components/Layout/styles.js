import styled from 'styled-components';
import { HEADER_HEIGHT, PAGE_WIDTH } from '../../tokens';

export const Wrapper = styled.div`
    position: relative;
    top: ${HEADER_HEIGHT};
    height: calc(100vh - ${HEADER_HEIGHT});
    margin: 0 auto;
    max-width: ${PAGE_WIDTH};
`;

export const Title = styled.h1`
    font-weight: 300;
`;
