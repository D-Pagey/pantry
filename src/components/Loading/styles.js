import styled from 'styled-components';
import { MOBILE_HEADER_HEIGHT, HEADER_HEIGHT, mediaQuery } from '../../tokens';

export const Wrapper = styled.div`
    align-items: center;
    display: flex;
    height: calc(100vh - ${MOBILE_HEADER_HEIGHT});
    justify-content: center;

    @media ${mediaQuery.tablet} {
        height: calc(100vh - ${HEADER_HEIGHT});
    }
`;
